"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileIcon as FilePresentationIcon,
  FileArchiveIcon,
  FileCodeIcon,
  Download,
  Trash2,
  Eye,
  Info,
} from "lucide-react"
import { formatFileSize, type StoredFile, deleteFile } from "@/lib/file-storage"
import { downloadFile } from "@/lib/download-utils"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getAllComponents } from "@/lib/data"

interface FileListProps {
  files: StoredFile[]
  onDelete?: (fileId: string) => void
  showPreview?: boolean
  showComponentInfo?: boolean
}

export function FileList({ files, onDelete, showPreview = true, showComponentInfo = false }: FileListProps) {
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<StoredFile | null>(null)
  const [fileInfo, setFileInfo] = useState<StoredFile | null>(null)
  const components = getAllComponents()

  if (files.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No files uploaded yet.</div>
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />
    } else if (fileType.includes("spreadsheet") || fileType.includes("excel") || fileType.includes("csv")) {
      return <FileSpreadsheetIcon className="h-5 w-5" />
    } else if (fileType.includes("presentation") || fileType.includes("powerpoint")) {
      return <FilePresentationIcon className="h-5 w-5" />
    } else if (fileType.includes("pdf") || fileType.includes("text")) {
      return <FileTextIcon className="h-5 w-5" />
    } else if (fileType.includes("zip") || fileType.includes("compressed") || fileType.includes("archive")) {
      return <FileArchiveIcon className="h-5 w-5" />
    } else if (fileType.includes("code") || fileType.includes("javascript") || fileType.includes("html")) {
      return <FileCodeIcon className="h-5 w-5" />
    } else {
      return <FileIcon className="h-5 w-5" />
    }
  }

  const handleDelete = async (fileId: string) => {
    try {
      const success = deleteFile(fileId)

      if (success) {
        toast({
          title: "File deleted",
          description: "The file has been deleted successfully.",
        })

        if (onDelete) {
          onDelete(fileId)
        }
      } else {
        throw new Error("Failed to delete file")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFileToDelete(null)
    }
  }

  const handleDownload = (file: StoredFile) => {
    downloadFile(file)
  }

  const getComponentName = (componentId?: string) => {
    if (!componentId) return "Unassigned"
    const component = components.find((c) => c.id === componentId)
    return component ? component.name : "Unknown Component"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex-shrink-0">
              {file.type.startsWith("image/") && showPreview ? (
                <div className="h-12 w-12 rounded-md overflow-hidden">
                  <img src={file.url || "/placeholder.svg"} alt={file.name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  {getFileIcon(file.type)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{formatFileSize(file.size)}</span>
                <span className="mx-1">•</span>
                <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                {showComponentInfo && file.componentId && (
                  <>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="text-xs h-5">
                      {getComponentName(file.componentId)}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDownload(file)}
              title="Download"
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>

            {file.type.startsWith("image/") && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewFile(file)}
                title="Preview"
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFileInfo(file)}
              title="File Info"
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">File Info</span>
            </Button>

            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFileToDelete(file.id)}
                title="Delete"
                className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        </div>
      ))}

      <AlertDialog open={!!fileToDelete} onOpenChange={(open) => !open && setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the file. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => fileToDelete && handleDelete(fileToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewFile?.name}</DialogTitle>
            <DialogDescription>
              {formatFileSize(previewFile?.size || 0)} • Uploaded on{" "}
              {new Date(previewFile?.uploadedAt || "").toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-2">
            <img
              src={previewFile?.url || "/placeholder.svg"}
              alt={previewFile?.name}
              className="max-h-[70vh] max-w-full object-contain rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPreviewFile(null)}>
              Close
            </Button>
            <Button onClick={() => previewFile && handleDownload(previewFile)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Info Dialog */}
      <Dialog open={!!fileInfo} onOpenChange={(open) => !open && setFileInfo(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium">Name:</div>
              <div className="col-span-2 break-words">{fileInfo?.name}</div>

              <div className="font-medium">Type:</div>
              <div className="col-span-2">{fileInfo?.type}</div>

              <div className="font-medium">Size:</div>
              <div className="col-span-2">{formatFileSize(fileInfo?.size || 0)}</div>

              <div className="font-medium">Uploaded:</div>
              <div className="col-span-2">{formatDate(fileInfo?.uploadedAt || "")}</div>

              <div className="font-medium">Component:</div>
              <div className="col-span-2">
                {fileInfo?.componentId ? getComponentName(fileInfo.componentId) : "Unassigned"}
              </div>

              <div className="font-medium">File ID:</div>
              <div className="col-span-2 text-xs text-muted-foreground break-all">{fileInfo?.id}</div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setFileInfo(null)}>
              Close
            </Button>
            <Button onClick={() => fileInfo && handleDownload(fileInfo)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
