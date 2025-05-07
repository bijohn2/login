import type { StoredFile } from "./file-storage"
import { toast } from "@/components/ui/use-toast"

// Download a single file
export function downloadFile(file: StoredFile): void {
  // Create a temporary anchor element
  const link = document.createElement("a")
  link.href = file.url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Show toast notification
  toast({
    title: "Download started",
    description: `Downloading ${file.name}...`,
  })
}

// Download multiple files as a zip
export async function downloadAllFiles(files: StoredFile[]): Promise<void> {
  if (files.length === 0) {
    toast({
      title: "No files to download",
      description: "There are no files to download.",
      variant: "destructive",
    })
    return
  }

  // If there's only one file, just download it directly
  if (files.length === 1) {
    downloadFile(files[0])
    return
  }

  try {
    // Import JSZip dynamically
    const JSZip = (await import("jszip")).default
    const zip = new JSZip()

    // Add each file to the zip
    files.forEach((file) => {
      // For data URLs, we need to extract the base64 data
      if (file.url.startsWith("data:")) {
        const base64Data = file.url.split(",")[1]
        zip.file(file.name, base64Data, { base64: true })
      } else {
        // For regular URLs, we'd need to fetch them first
        // This is a simplified version that works with data URLs
        zip.file(file.name, file.url)
      }
    })

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" })

    // Create a download link for the zip
    const link = document.createElement("a")
    link.href = URL.createObjectURL(zipBlob)
    link.download = "files.zip"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the object URL
    URL.revokeObjectURL(link.href)

    toast({
      title: "Download started",
      description: `Downloading ${files.length} files as a zip archive...`,
    })
  } catch (error) {
    console.error("Error creating zip file:", error)

    // Fallback: download files individually
    toast({
      title: "Downloading files individually",
      description: "Could not create a zip archive. Downloading files one by one...",
    })

    // Download each file with a slight delay to avoid browser issues
    files.forEach((file, index) => {
      setTimeout(() => downloadFile(file), index * 500)
    })
  }
}
