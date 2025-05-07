"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Mic, Upload } from "lucide-react"
import { formatAudioSize } from "@/lib/audio-storage"

interface AudioUploadProps {
  onUpload: (file: File) => Promise<void>
  accept?: string
  maxSize?: number // in bytes
  className?: string
  buttonText?: string
}

export function AudioUpload({
  onUpload,
  accept = "audio/*",
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = "",
  buttonText = "Upload Audio",
}: AudioUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!file.type.match(accept.replace(/\*/g, ".*"))) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file of type: ${accept}`,
        variant: "destructive",
      })
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${formatAudioSize(maxSize)}`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      await onUpload(file)
      setUploadProgress(100)

      toast({
        title: "Audio uploaded",
        description: "Your audio file has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your audio file. Please try again.",
        variant: "destructive",
      })
    } finally {
      clearInterval(interval)
      setIsUploading(false)
      setUploadProgress(0)

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioFile = new File([audioBlob], `recording-${Date.now()}.wav`, { type: "audio/wav" })
        handleFileUpload(audioFile)
      }

      mediaRecorder.start()
      setIsRecording(true)

      toast({
        title: "Recording started",
        description: "Your audio is now being recorded. Click the mic button again to stop.",
      })
    } catch (error) {
      console.error("Error starting recording:", error)
      toast({
        title: "Recording error",
        description: "Could not access microphone. Please check your permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop()
      })
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          disabled={isUploading || isRecording}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>

          <div className="text-sm text-center">
            {isUploading ? (
              <p className="font-medium">Uploading audio...</p>
            ) : isRecording ? (
              <p className="font-medium text-red-500">Recording in progress...</p>
            ) : (
              <p className="font-medium">Drag and drop your audio file here</p>
            )}
            <p className="text-muted-foreground mt-1">or use the buttons below</p>
          </div>

          {isUploading ? (
            <div className="w-full max-w-xs">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="text-xs text-muted-foreground mt-1 text-center">{uploadProgress}%</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isRecording}
              >
                {buttonText}
              </Button>
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={toggleRecording}
                disabled={isUploading}
              >
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Recording" : "Record Audio"}
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground">Maximum file size: {formatAudioSize(maxSize)}</p>
        </div>
      </div>
    </div>
  )
}
