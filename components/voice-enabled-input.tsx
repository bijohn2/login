"use client"

import type React from "react"

import { useState, useEffect, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { VoiceInputButton } from "@/components/voice-input-button"
import { cn } from "@/lib/utils"

interface VoiceEnabledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void
  appendText?: boolean
  onTranscriptionStart?: () => void
  onTranscriptionEnd?: (transcript: string) => void
}

const VoiceEnabledInput = forwardRef<HTMLInputElement, VoiceEnabledInputProps>(
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Simulate an input change event for onChange handlers
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue },
          currentTarget: { value: newValue },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    // Determine if component is controlled or uncontrolled
    const inputValue = typeof propValue !== "undefined" ? propValue : internalValue

    return (
      <div className="relative flex w-full items-center">
        <Input
          {...props}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          className={cn("pr-24", className)}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
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

VoiceEnabledInput.displayName = "VoiceEnabledInput"

export { VoiceEnabledInput }
