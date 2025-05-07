// This simulates file storage in the browser for demo purposes
// In a real application, this would be replaced with actual file storage like S3, Cloudinary, etc.

export interface StoredFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
  componentId?: string
}

// Initialize storage if it doesn't exist
function initializeStorage() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("uploadedFiles")) {
    localStorage.setItem("uploadedFiles", JSON.stringify([]))
  }

  if (!localStorage.getItem("profileImages")) {
    localStorage.setItem("profileImages", JSON.stringify({}))
  }
}

// File storage functions
export async function uploadFile(file: File, componentId?: string): Promise<StoredFile> {
  initializeStorage()

  return new Promise((resolve) => {
    // Create a FileReader to read the file as a data URL
    const reader = new FileReader()

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string

      const storedFile: StoredFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        url: dataUrl,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        componentId,
      }

      const files = getUploadedFiles()
      files.push(storedFile)
      localStorage.setItem("uploadedFiles", JSON.stringify(files))

      // Simulate network delay
      setTimeout(() => resolve(storedFile), 500)
    }

    reader.readAsDataURL(file)
  })
}

export function getUploadedFiles(componentId?: string): StoredFile[] {
  initializeStorage()
  const files = JSON.parse(localStorage.getItem("uploadedFiles") || "[]") as StoredFile[]

  if (componentId) {
    return files.filter((file) => file.componentId === componentId)
  }

  return files
}

export function deleteFile(fileId: string): boolean {
  initializeStorage()
  const files = getUploadedFiles()
  const updatedFiles = files.filter((file) => file.id !== fileId)

  if (updatedFiles.length === files.length) {
    return false
  }

  localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles))
  return true
}

// Profile image functions
export async function uploadProfileImage(userId: string, file: File): Promise<string> {
  initializeStorage()

  return new Promise((resolve) => {
    // Create a FileReader to read the file as a data URL
    const reader = new FileReader()

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string

      const profileImages = JSON.parse(localStorage.getItem("profileImages") || "{}")
      profileImages[userId] = {
        url: dataUrl,
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem("profileImages", JSON.stringify(profileImages))

      // Simulate network delay
      setTimeout(() => resolve(dataUrl), 500)
    }

    reader.readAsDataURL(file)
  })
}

export function getProfileImage(userId: string): string | null {
  initializeStorage()
  const profileImages = JSON.parse(localStorage.getItem("profileImages") || "{}")
  return profileImages[userId]?.url || null
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
