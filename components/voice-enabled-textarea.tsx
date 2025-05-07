"use client"

import type React from "react"

import { useState, useEffect, forwardRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { VoiceInputButton } from "@/components/voice-input-button"
import { cn } from "@/lib/utils"

interface VoiceEnabledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void
  appendText?: boolean
  onTranscriptionStart?: () => void
  onTranscriptionEnd?: (transcript: string) => void
}

const VoiceEnabledTextarea = forwardRef<HTMLTextAreaElement, VoiceEnabledTextareaProps>(
  (
    {
      className,
      onValueChange,
      appendText = true,
      value: propValue,
      onChange,
      onTranscriptionStart,
      onTranscriptionEnd,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      typeof propValue !== "undefined" ? String(propValue) : props.defaultValue?.toString() || "",
    )

    // Only update internal state when prop value changes from outside
    useEffect(() => {
      if (typeof propValue !== "undefined" && propValue !== internalValue) {
        setInternalValue(String(propValue))
      }
    }, [propValue, internalValue])

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)

      // Call the original onChange if provided
      if (onChange) {
        onChange(e)
      }

      // Call onValueChange callback if provided
      if (onValueChange) {
        onValueChange(newValue)
      }
    }

    const handleTranscriptChange = (transcript: string) => {
      const newValue = appendText ? `${internalValue} ${transcript}`.trim() : transcript
      setInternalValue(newValue)

      // Call onValueChange callback if provided
      if (onValueChange) {
        onValueChange(newValue)
      }

      // Call onTranscriptionEnd if provided
      if (onTranscriptionEnd) {
        onTranscriptionEnd(transcript)
      }

      // Simulate a textarea change event for onChange handlers
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue },
          currentTarget: { value: newValue },
        } as React.ChangeEvent<HTMLTextAreaElement>
        onChange(syntheticEvent)
      }
    }

    // Determine if component is controlled or uncontrolled
    const textareaValue = typeof propValue !== "undefined" ? propValue : internalValue

    return (
      <div className="relative">
        <Textarea
          {...props}
          ref={ref}
          value={textareaValue}
          onChange={handleTextareaChange}
          className={cn("min-h-[100px]", className)}
        />
        <div className="absolute right-2 top-2">
          <VoiceInputButton
            onTranscriptChange={handleTranscriptChange}
            onRecordingStart={onTranscriptionStart}
            onRecordingEnd={onTranscriptionEnd}
            className="h-8"
          />
        </div>
      </div>
    )
  },
)

VoiceEnabledTextarea.displayName = "VoiceEnabledTextarea"

export { VoiceEnabledTextarea }
