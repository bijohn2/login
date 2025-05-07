"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { TutorialPopup } from "@/components/tutorial-popup"

interface TutorialTriggerProps {
  tutorialId: string
}

export function TutorialTrigger({ tutorialId }: TutorialTriggerProps) {
  const [showTutorial, setShowTutorial] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowTutorial(true)} className="gap-1">
        <HelpCircle className="h-4 w-4" />
        <span>Help</span>
      </Button>

      {showTutorial && <TutorialPopup tutorialId={tutorialId} onClose={() => setShowTutorial(false)} />}
    </>
  )
}
