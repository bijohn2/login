"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Mic, MicOff, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdvancedVoiceInputProps {
  onTranscriptComplete: (transcript: string) => void
  onCancel?: () => void
  maxDuration?: number // in seconds
  className?: string
  placeholder?: string
  showPreview?: boolean
}

export function AdvancedVoiceInput({
  onTranscriptComplete,
  onCancel,
  maxDuration = 60,
  className = "",
  placeholder = "Your speech will appear here...",
  showPreview = true,
}: AdvancedVoiceInputProps) {
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [localTranscript, setLocalTranscript] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleTranscriptResult = useCallback((result: string) => {
    setLocalTranscript((prev) => {
      const newTranscript = prev ? `${prev} ${result}` : result
      return newTranscript
    })
  }, [])

  const { isListening, error, startListening, stopListening, resetTranscript, hasRecognitionSupport } =
    useSpeechRecognition({
      onResult: handleTranscriptResult,
    })

  // Start/stop timer based on listening state
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxDuration) {
            stopListening()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isListening, maxDuration, stopListening])

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Speech Recognition Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error])

  const handleStartRecording = useCallback(() => {
    if (!hasRecognitionSupport) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try using Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    resetTranscript()
    setLocalTranscript("")
    setRecordingTime(0)
    startListening()
  }, [hasRecognitionSupport, resetTranscript, startListening])

  const handleStopRecording = useCallback(() => {
    stopListening()
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
    }, 500)
  }, [stopListening])

  const handleComplete = useCallback(() => {
    onTranscriptComplete(localTranscript)
    resetTranscript()
    setLocalTranscript("")
    setRecordingTime(0)
  }, [localTranscript, onTranscriptComplete, resetTranscript])

  const handleCancel = useCallback(() => {
    resetTranscript()
    setLocalTranscript("")
    setRecordingTime(0)
    if (onCancel) onCancel()
  }, [onCancel, resetTranscript])

  const handleReset = useCallback(() => {
    resetTranscript()
    setLocalTranscript("")
  }, [resetTranscript])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!hasRecognitionSupport) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-center text-red-500">Speech Recognition Not Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Voice Input</CardTitle>
          {isListening && (
            <Badge variant="outline" className="bg-red-50 text-red-500 animate-pulse">
              Recording {formatTime(recordingTime)} / {formatTime(maxDuration)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showPreview && (
          <div className="min-h-[100px] max-h-[200px] overflow-y-auto p-3 bg-muted/50 rounded-md mb-4">
            {localTranscript ? <p>{localTranscript}</p> : <p className="text-muted-foreground">{placeholder}</p>}
          </div>
        )}

        {isListening && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span>0:00</span>
              <span>{formatTime(maxDuration)}</span>
            </div>
            <Progress value={(recordingTime / maxDuration) * 100} className="h-2" />
          </div>
        )}

        <div className="flex justify-center gap-4">
          {isListening ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                    onClick={handleStopRecording}
                  >
                    <MicOff className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stop recording</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : isProcessing ? (
            <Button variant="outline" size="lg" className="rounded-full w-12 h-12 p-0" disabled>
              <Loader2 className="h-5 w-5 animate-spin" />
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full w-12 h-12 p-0 bg-red-500 hover:bg-red-600"
                    onClick={handleStartRecording}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start recording</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {localTranscript && (
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
          <Button onClick={handleComplete} disabled={!localTranscript || isListening || isProcessing}>
            Use Text
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
