"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void
  onEnd?: () => void
}

export function useSpeechRecognition({ onResult, onEnd }: UseSpeechRecognitionProps = {}) {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  // Check if browser supports speech recognition
  const hasRecognitionSupport =
    typeof window !== "undefined" && !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition)

  // Initialize recognition instance
  useEffect(() => {
    if (!hasRecognitionSupport) return

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => {
          const newTranscript = prev + finalTranscript
          if (onResult) onResult(finalTranscript.trim())
          return newTranscript
        })
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      setError(`Speech recognition error: ${event.error}`)
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
      if (onEnd) onEnd()
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (err) {
          // Ignore errors when stopping
        }
      }
    }
  }, [hasRecognitionSupport, onResult, onEnd])

  const startListening = useCallback(() => {
    setError(null)
    if (!recognitionRef.current) return

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error("Error starting speech recognition", err)

      // If already started, stop and restart
      try {
        recognitionRef.current.stop()
        setTimeout(() => {
          recognitionRef.current.start()
          setIsListening(true)
        }, 100)
      } catch (stopErr) {
        console.error("Error stopping speech recognition", stopErr)
        setError("Failed to start speech recognition")
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return

    try {
      recognitionRef.current.stop()
      setIsListening(false)
    } catch (err) {
      console.error("Error stopping speech recognition", err)
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport,
  }
}
