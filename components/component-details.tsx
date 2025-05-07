"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileList } from "@/components/file-list"
import { getUploadedFiles } from "@/lib/file-storage"
import { Button } from "@/components/ui/button"
import { Upload, Download } from "lucide-react"
import Link from "next/link"
import type { ComponentType } from "@/lib/types"
import { downloadAllFiles } from "@/lib/download-utils"

interface ComponentDetailsProps {
  component: ComponentType
}

export function ComponentDetails({ component }: ComponentDetailsProps) {
  const files = getUploadedFiles(component.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return <Badge className="bg-green-500">Complete</Badge>
      case "In Design":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            In Design
          </Badge>
        )
      case "Under Review":
        return <Badge variant="secondary">Under Review</Badge>
      case "In Development":
        return <Badge className="bg-purple-500">In Development</Badge>
      case "Testing":
        return <Badge className="bg-pink-500">Testing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Generate initials safely with null checks
  const getInitials = (name: string | undefined) => {
    if (!name) return "NA"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="files" className="flex items-center gap-1">
          Files
          {files.length > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">{files.length}</span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Component Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="mt-1 text-base">{component.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="mt-1 text-base">{component.location || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Function</h3>
                <p className="mt-1 text-base">{component.function || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">{getStatusBadge(component.status)}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                <div className="mt-1">{getPriorityBadge(component.priority)}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p className="mt-1 text-base">
                  {component.lastUpdated || new Date(component.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Buttons and Functions</h3>
                <p className="mt-1 text-base">{component.buttons || "None specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Linked Pages</h3>
                <p className="mt-1 text-base">{component.linkedPages || "None specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                <p className="mt-1 text-base">{component.notes || "No notes available"}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={component.assignedTo || "Unassigned"} />
                    <AvatarFallback>{getInitials(component.assignedTo)}</AvatarFallback>
                  </Avatar>
                  <span>{component.assignedTo || "Unassigned"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="files">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Attached Files</CardTitle>
            <div className="flex gap-2">
              <Link href={`/components/${component.id}?tab=files`}>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </Link>
              {files.length > 0 && (
                <Button variant="secondary" size="sm" onClick={() => downloadAllFiles(files)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No files attached</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload files to this component to keep track of important documents and assets.
                </p>
                <Link href={`/components/${component.id}?tab=files`}>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                </Link>
              </div>
            ) : (
              <FileList files={files} showPreview={true} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
