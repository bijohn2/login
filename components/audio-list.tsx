"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Play, Trash2, Download } from "lucide-react"
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
import { type StoredAudio, deleteAudio, formatAudioDuration, formatAudioSize } from "@/lib/audio-storage"
import { AudioPlayer } from "@/components/audio-player"

interface AudioListProps {
  audioFiles: StoredAudio[]
  onDelete?: (audioId: string) => void
}

export function AudioList({ audioFiles, onDelete }: AudioListProps) {
  const [selectedAudio, setSelectedAudio] = useState<StoredAudio | null>(null)
  const [audioToDelete, setAudioToDelete] = useState<string | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  if (audioFiles.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No audio files found</p>
      </div>
    )
  }

  const handleDelete = (audioId: string) => {
    const success = deleteAudio(audioId)

    if (success) {
      if (onDelete) {
        onDelete(audioId)
      }

      toast({
        title: "Audio deleted",
        description: "The audio file has been deleted successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "There was a problem deleting the audio file.",
        variant: "destructive",
      })
    }

    setAudioToDelete(null)
  }

  const handlePlay = (audio: StoredAudio) => {
    setSelectedAudio(audio)
    setIsPlayerOpen(true)
  }

  const handleDownload = (audio: StoredAudio) => {
    // Create a temporary anchor element
    const a = document.createElement("a")
    a.href = audio.url
    a.download = audio.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Download started",
      description: `Downloading ${audio.name}`,
    })
  }

  return (
    <div className="space-y-4">
      {audioFiles.map((audio) => (
        <Card key={audio.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{audio.name}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{formatAudioDuration(audio.duration)}</span>
                  <span className="mx-2">•</span>
                  <span>{formatAudioSize(audio.size)}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handlePlay(audio)}>
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Play</span>
                </Button>

                <Button variant="ghost" size="icon" onClick={() => handleDownload(audio)}>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>

                <Button variant="ghost" size="icon" onClick={() => setAudioToDelete(audio.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Audio Player Dialog */}
      <AlertDialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedAudio?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAudio && <AudioPlayer audioUrl={selectedAudio.url} editable={false} />}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!audioToDelete} onOpenChange={() => setAudioToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the audio file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => audioToDelete && handleDelete(audioToDelete)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
