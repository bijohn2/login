"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getTutorialSteps } from "@/lib/tutorial-data"

interface TutorialPopupProps {
  tutorialId: string
  onClose: () => void
}

export function TutorialPopup({ tutorialId, onClose }: TutorialPopupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    // Get tutorial steps based on the tutorialId
    const tutorialSteps = getTutorialSteps(tutorialId)
    setSteps(tutorialSteps)
  }, [tutorialId])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    // Save tutorial completion status
    localStorage.setItem(`tutorial-${tutorialId}-completed`, "true")
    onClose()
  }

  if (steps.length === 0) {
    return null
  }

  const currentTutorialStep = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardTitle>{completed ? "Tutorial Complete" : currentTutorialStep.title}</CardTitle>
          <CardDescription>
            {completed ? "You've completed all steps in this tutorial." : `Step ${currentStep + 1} of ${steps.length}`}
          </CardDescription>
          <Progress value={progress} className="h-1 mt-2" />
        </CardHeader>
        <CardContent>
          {completed ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold">Great job!</h3>
              <p className="text-muted-foreground mt-2">
                You've completed the tutorial. You can now use this feature with confidence.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentTutorialStep.image && (
                <div className="flex justify-center">
                  <img
                    src={currentTutorialStep.image || "/placeholder.svg"}
                    alt={`Tutorial step ${currentStep + 1}`}
                    className="rounded-lg border max-h-48 object-contain"
                  />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: currentTutorialStep.content }} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {completed ? (
            <Button onClick={handleFinish} className="w-full">
              Finish
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
