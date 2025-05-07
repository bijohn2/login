"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VoiceInputButtonProps extends React.ComponentProps<typeof Button> {
  onTranscriptChange: (transcript: string) => void
  onRecordingStart?: () => void
  onRecordingEnd?: () => void
  appendToExisting?: boolean
}

export function VoiceInputButton({
  onTranscriptChange,
  onRecordingStart,
  onRecordingEnd,
  appendToExisting = true,
  className,
  ...props
}: VoiceInputButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTranscriptResult = useCallback(
    (result: string) => {
      if (result.trim()) {
        onTranscriptChange(result.trim())
      }
    },
    [onTranscriptChange],
  )

  const handleRecordingEnd = useCallback(() => {
    if (onRecordingEnd) {
      onRecordingEnd()
    }
  }, [onRecordingEnd])

  const { isListening, error, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition({
    onResult: handleTranscriptResult,
    onEnd: handleRecordingEnd,
  })

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

  const toggleRecording = useCallback(() => {
    if (!hasRecognitionSupport) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try using Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      stopListening()
      setIsProcessing(true)

      // Small delay to ensure processing is complete
      setTimeout(() => {
        setIsProcessing(false)
      }, 500)
    } else {
      startListening()
      if (onRecordingStart) {
        onRecordingStart()
      }
    }
  }, [hasRecognitionSupport, isListening, onRecordingStart, startListening, stopListening])

  if (!hasRecognitionSupport) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn("opacity-50", className)}
        disabled
        title="Speech recognition not supported in this browser"
        {...props}
      >
        <Mic className="h-4 w-4 mr-1" />
        <span>Not Supported</span>
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="sm"
            className={cn(isListening && "animate-pulse", className)}
            onClick={toggleRecording}
            disabled={isProcessing}
            {...props}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                <span>Processing...</span>
              </>
            ) : isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-1" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-1" />
                <span>Record</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isListening ? "Click to stop recording" : "Click to start voice input"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
