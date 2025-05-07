"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Download, Search } from "lucide-react"
import { AudioList } from "@/components/audio-list"
import { type StoredAudio, getStoredAudio } from "@/lib/audio-storage"
import { getAllComponents } from "@/lib/data"
import { downloadAllFiles } from "@/lib/download-utils"

export function AudioManager() {
  const [audioFiles, setAudioFiles] = useState<StoredAudio[]>([])
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<StoredAudio[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const components = getAllComponents()

  // Load audio files
  useEffect(() => {
    const files = getStoredAudio()
    setAudioFiles(files)
    setFilteredAudioFiles(files)
  }, [])

  // Filter audio files based on search query and active tab
  useEffect(() => {
    let filtered = audioFiles

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((audio) => audio.name.toLowerCase().includes(query))
    }

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((audio) => audio.componentId === activeTab)
    }

    setFilteredAudioFiles(filtered)
  }, [searchQuery, activeTab, audioFiles])

  const handleDelete = (audioId: string) => {
    setAudioFiles((prev) => prev.filter((audio) => audio.id !== audioId))
  }

  const handleDownloadAll = () => {
    // Convert audio files to the format expected by downloadAllFiles
    const filesToDownload = filteredAudioFiles.map((audio) => ({
      id: audio.id,
      name: audio.name,
      url: audio.url,
      type: "audio",
      size: audio.size,
    }))

    downloadAllFiles(filesToDownload)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search audio files..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredAudioFiles.length > 0 && (
          <Button variant="outline" onClick={handleDownloadAll}>
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Audio</TabsTrigger>
          {components.map((component) => (
            <TabsTrigger key={component.id} value={component.id}>
              {component.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Audio Files</CardTitle>
              <CardDescription>Manage all audio files in your library.</CardDescription>
            </CardHeader>
            <CardContent>
              <AudioList audioFiles={filteredAudioFiles} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>

        {components.map((component) => (
          <TabsContent key={component.id} value={component.id}>
            <Card>
              <CardHeader>
                <CardTitle>{component.name} Audio</CardTitle>
                <CardDescription>Audio files associated with the {component.name} component.</CardDescription>
              </CardHeader>
              <CardContent>
                <AudioList
                  audioFiles={audioFiles.filter((audio) => audio.componentId === component.id)}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="unassigned">
          <Card>
            <CardHeader>
              <CardTitle>Unassigned Audio</CardTitle>
              <CardDescription>Audio files not associated with any component.</CardDescription>
            </CardHeader>
            <CardContent>
              <AudioList audioFiles={audioFiles.filter((audio) => !audio.componentId)} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
