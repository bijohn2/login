"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ArrowRight, Lightbulb } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function PlatformTutorial() {
  const [showTutorial, setShowTutorial] = useState(false)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen the tutorial before
    const tutorialSeen = localStorage.getItem("platform-tutorial-seen")
    setHasSeenTutorial(!!tutorialSeen)

    // If not seen before, show the tutorial popup after a short delay
    if (!tutorialSeen) {
      const timer = setTimeout(() => {
        setShowTutorial(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleStartTutorial = () => {
    // Mark tutorial as seen
    localStorage.setItem("platform-tutorial-seen", "true")
    setHasSeenTutorial(true)
    setShowTutorial(false)

    // Navigate to dashboard and show first tutorial step
    router.push("/")

    // Show toast with instructions
    toast({
      title: "Tutorial Started",
      description: "Click the Help button in the top right of each page to learn more about that section.",
    })
  }

  const handleDismiss = () => {
    // Mark tutorial as seen but don't start it
    localStorage.setItem("platform-tutorial-seen", "true")
    setHasSeenTutorial(true)
    setShowTutorial(false)

    toast({
      title: "Tutorial Dismissed",
      description: "You can always access tutorials by clicking the Help button on any page.",
    })
  }

  if (!showTutorial) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={handleDismiss}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle>Welcome to Component Tracker</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Would you like to take a quick tour of the platform to learn about its features?</p>
            <p className="text-sm text-muted-foreground">
              This will guide you through the main sections and help you get started quickly.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleDismiss}>
            Skip Tutorial
          </Button>
          <Button onClick={handleStartTutorial}>
            Start Tour
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
