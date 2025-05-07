// This simulates audio storage in the browser for demo purposes
// In a real application, this would be replaced with actual audio storage like S3, Firebase Storage, etc.

export interface StoredAudio {
  id: string
  name: string
  url: string
  duration: number
  size: number
  createdAt: string
  componentId?: string
}

// Initialize storage if it doesn't exist
function initializeStorage() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("storedAudio")) {
    localStorage.setItem("storedAudio", JSON.stringify([]))
  }
}

// Audio storage functions
export async function uploadAudio(audioBlob: Blob, name: string, componentId?: string): Promise<StoredAudio> {
  initializeStorage()

  return new Promise((resolve) => {
    // Create a URL for the audio blob
    const url = URL.createObjectURL(audioBlob)

    // Create an audio element to get the duration
    const audio = new Audio(url)

    audio.addEventListener("loadedmetadata", () => {
      const storedAudio: StoredAudio = {
        id: `audio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: name,
        url: url,
        duration: audio.duration,
        size: audioBlob.size,
        createdAt: new Date().toISOString(),
        componentId,
      }

      const audioFiles = getStoredAudio()
      audioFiles.push(storedAudio)
      localStorage.setItem("storedAudio", JSON.stringify(audioFiles))

      // Simulate network delay
      setTimeout(() => resolve(storedAudio), 500)
    })

    audio.addEventListener("error", () => {
      // If there's an error loading the audio, create a record with default duration
      const storedAudio: StoredAudio = {
        id: `audio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: name,
        url: url,
        duration: 0,
        size: audioBlob.size,
        createdAt: new Date().toISOString(),
        componentId,
      }

      const audioFiles = getStoredAudio()
      audioFiles.push(storedAudio)
      localStorage.setItem("storedAudio", JSON.stringify(audioFiles))

      // Simulate network delay
      setTimeout(() => resolve(storedAudio), 500)
    })
  })
}

export function getStoredAudio(componentId?: string): StoredAudio[] {
  initializeStorage()
  const audioFiles = JSON.parse(localStorage.getItem("storedAudio") || "[]") as StoredAudio[]

  if (componentId) {
    return audioFiles.filter((audio) => audio.componentId === componentId)
  }

  return audioFiles
}

export function deleteAudio(audioId: string): boolean {
  initializeStorage()
  const audioFiles = getStoredAudio()
  const updatedAudioFiles = audioFiles.filter((audio) => audio.id !== audioId)

  if (updatedAudioFiles.length === audioFiles.length) {
    return false
  }

  localStorage.setItem("storedAudio", JSON.stringify(updatedAudioFiles))
  return true
}

// Helper function to format audio duration
export function formatAudioDuration(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return "00:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Helper function to format file size
export function formatAudioSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
