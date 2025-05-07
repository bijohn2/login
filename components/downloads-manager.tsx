"use client"

import { useState, useEffect } from "react"
import { Download, FileText, FolderOpen, Package } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { downloadAllFiles } from "@/lib/download-utils"
import { getAllComponents } from "@/lib/data"
import { toast } from "@/hooks/use-toast"
import type { ComponentType } from "@/lib/types"

export function DownloadsManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [components, setComponents] = useState<ComponentType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadComponents() {
      try {
        setIsLoading(true)
        const data = await getAllComponents()
        setComponents(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading components:", error)
        toast({
          title: "Error",
          description: "Failed to load components. Please refresh the page.",
          variant: "destructive",
        })
        setComponents([])
      } finally {
        setIsLoading(false)
      }
    }

    loadComponents()
  }, [])

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    try {
      await downloadAllFiles()
      toast({
        title: "Download Complete",
        description: "All files have been downloaded successfully.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleComponentDownload = async (componentId: string, componentName: string) => {
    try {
      await downloadAllFiles(componentId)
      toast({
        title: "Download Complete",
        description: `Files for ${componentName} have been downloaded successfully.`,
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download Failed",
        description: `There was an error downloading files for ${componentName}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">All Files</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Download All</div>
              <p className="text-xs text-muted-foreground">Download all project files in a single ZIP archive</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleDownloadAll} disabled={isDownloading}>
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Preparing..." : "Download All Files"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">File Manager</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Files</div>
              <p className="text-xs text-muted-foreground">Browse and manage all your project files</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => (window.location.href = "/files")}>
                Go to File Manager
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upload Files</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Add New Files</div>
              <p className="text-xs text-muted-foreground">Upload new files to your project</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => (window.location.href = "/files/upload")}>
                Upload Files
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">History</div>
              <p className="text-xs text-muted-foreground">View your recent download history</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="components">
          <TabsList>
            <TabsTrigger value="components">By Component</TabsTrigger>
            <TabsTrigger value="types">By File Type</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="search-components" className="sr-only">
                Search Components
              </Label>
              <Input
                id="search-components"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Loading components...</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((component) => (
                    <div key={component.id}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{component.name}</CardTitle>
                          <CardDescription>
                            {component.location} • {component.status}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date(component.updatedAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            onClick={() => handleComponentDownload(component.id, component.name)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Files
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No components found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="types">
            <div className="py-8 text-center">
              <p className="text-muted-foreground">File type filtering coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
