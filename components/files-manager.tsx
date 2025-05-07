"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileList } from "@/components/file-list"
import { getUploadedFiles, type StoredFile } from "@/lib/file-storage"
import { Search, Filter, Download } from "lucide-react"
import { getAllComponents } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { downloadAllFiles } from "@/lib/download-utils"

export function FilesManager() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<StoredFile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [fileTypeFilter, setFileTypeFilter] = useState("all")
  const [componentFilter, setComponentFilter] = useState("all")
  const [components, setComponents] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    try {
      const allComponents = getAllComponents()
      // Ensure components is an array
      setComponents(Array.isArray(allComponents) ? allComponents : [])
    } catch (error) {
      console.error("Error loading components:", error)
      setComponents([])
    }
  }, [])

  useEffect(() => {
    // Load all files
    const allFiles = getUploadedFiles()
    setFiles(allFiles)
    setFilteredFiles(allFiles)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    filterFiles(e.target.value, fileTypeFilter, componentFilter)
  }

  const handleFileTypeFilter = (value: string) => {
    setFileTypeFilter(value)
    filterFiles(searchTerm, value, componentFilter)
  }

  const handleComponentFilter = (value: string) => {
    setComponentFilter(value)
    filterFiles(searchTerm, fileTypeFilter, value)
  }

  const filterFiles = (search: string, fileType: string, componentId: string) => {
    let filtered = files

    if (search) {
      filtered = filtered.filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (fileType !== "all") {
      filtered = filtered.filter((file) => {
        if (fileType === "image") return file.type.startsWith("image/")
        if (fileType === "document")
          return file.type.includes("pdf") || file.type.includes("word") || file.type.includes("text")
        if (fileType === "spreadsheet")
          return file.type.includes("excel") || file.type.includes("spreadsheet") || file.type.includes("csv")
        if (fileType === "presentation") return file.type.includes("presentation") || file.type.includes("powerpoint")
        if (fileType === "archive")
          return file.type.includes("zip") || file.type.includes("compressed") || file.type.includes("archive")
        return true
      })
    }

    if (componentId !== "all") {
      filtered = filtered.filter((file) => file.componentId === componentId)
    }

    setFilteredFiles(filtered)
  }

  const handleFileDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
    setFilteredFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getComponentName = (componentId?: string) => {
    if (!componentId) return "Unassigned"
    const component = components.find((c) => c.id === componentId)
    return component ? component.name : "Unknown Component"
  }

  // Group files by component
  const filesByComponent = filteredFiles.reduce(
    (acc, file) => {
      const componentId = file.componentId || "unassigned"
      if (!acc[componentId]) {
        acc[componentId] = []
      }
      acc[componentId].push(file)
      return acc
    },
    {} as Record<string, StoredFile[]>,
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>File Management</CardTitle>
            {filteredFiles.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => downloadAllFiles(filteredFiles)}>
                <Download className="mr-2 h-4 w-4" />
                Download All ({filteredFiles.length})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search files..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={fileTypeFilter} onValueChange={handleFileTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All File Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
                    <SelectItem value="presentation">Presentations</SelectItem>
                    <SelectItem value="archive">Archives</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={componentFilter} onValueChange={handleComponentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Components</SelectItem>
                    {components.map((component) => (
                      <SelectItem key={component.id} value={component.id}>
                        {component.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="unassigned">Unassigned Files</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="by-component">By Component</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredFiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No files found. Try adjusting your filters or upload new files.
                </div>
              ) : (
                <FileList files={filteredFiles} onDelete={handleFileDelete} showPreview={true} />
              )}
            </TabsContent>

            <TabsContent value="by-component">
              {Object.keys(filesByComponent).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No files found. Try adjusting your filters or upload new files.
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(filesByComponent).map(([componentId, files]) => (
                    <Card key={componentId} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {getComponentName(componentId === "unassigned" ? undefined : componentId)}
                          </CardTitle>
                          <Badge variant="outline">{files.length} files</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <FileList files={files} onDelete={handleFileDelete} showPreview={true} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
