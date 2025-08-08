"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  title: string
  description: string
  url: string
  duration: string
  date: string
}

export function AudioPlayer({ title, description, url, duration, date }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create audio element
  useEffect(() => {
    audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_lNcjg8vwUSPNrMuV6ojJA4CZZOKn/AveNSe7qgXceyBWCjuwHHd/public/placeholder.mp3") // Placeholder audio
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Update time
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime)
      }
    }
  }, [])

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <div className="flex flex-1 flex-col gap-1">
            <Slider
              value={[currentTime]}
              max={audioRef.current?.duration || 100}
              step={1}
              onValueChange={handleSeek}
              aria-label="Seek time"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              className="w-20"
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              aria-label="Volume"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">Recorded on {date}</div>
      </CardFooter>
    </Card>
  )
}
