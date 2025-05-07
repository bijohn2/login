"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { uploadFile, type StoredFile } from "@/lib/file-storage"
import { toast } from "@/components/ui/use-toast"
import { getAllComponents } from "@/lib/data"
import { FileList } from "@/components/file-list"
import type { ComponentType } from "@/lib/types"

export function FileUploadForm() {
  const router = useRouter()
  const [selectedComponent, setSelectedComponent] = useState<string | undefined>(undefined)
  const [uploadedFiles, setUploadedFiles] = useState<StoredFile[]>([])
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
          description: "Failed to load components. Please try again.",
          variant: "destructive",
        })
        setComponents([])
      } finally {
        setIsLoading(false)
      }
    }

    loadComponents()
  }, [])

  const handleFileUpload = async (file: File) => {
    try {
      const uploadedFile = await uploadFile(file, selectedComponent)
      setUploadedFiles((prev) => [...prev, uploadedFile])

      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    }
  }

  const handleFileDelete = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleDone = () => {
    router.push("/files")
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="component" className="text-sm font-medium">
              Assign to Component (Optional)
            </label>
            <Select value={selectedComponent} onValueChange={setSelectedComponent} disabled={isLoading}>
              <SelectTrigger id="component">
                <SelectValue placeholder={isLoading ? "Loading components..." : "Select a component"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Unassigned)</SelectItem>
                {components.map((component) => (
                  <SelectItem key={component.id} value={component.id}>
                    {component.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Files can be assigned to a specific component or left unassigned.
            </p>
          </div>

          <FileUpload
            onUpload={handleFileUpload}
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
            maxSize={20 * 1024 * 1024} // 20MB
            buttonText="Choose File"
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Uploaded Files</h3>
            <FileList files={uploadedFiles} onDelete={handleFileDelete} showPreview={true} />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="button" onClick={handleDone}>
            Done
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
