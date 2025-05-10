"use client"

import { useEffect, useState } from "react"
import { Command } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ShortcutProps {
  keys: string[]
  description: string
}

function Shortcut({ keys, description }: ShortcutProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{description}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, index) => (
          <span
            key={index}
            className="flex h-6 min-w-6 items-center justify-center rounded border bg-muted px-1.5 text-xs font-medium"
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  )
}

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open shortcuts dialog when user presses Cmd+/ or Ctrl+/
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Command className="h-4 w-4" />
          <span className="hidden md:inline">Keyboard shortcuts</span>
          <span className="md:hidden">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Shortcut keys={["⌘", "/"]} description="Open keyboard shortcuts" />
          <Shortcut keys={["⌘", "K"]} description="Open search" />
          <Shortcut keys={["⌘", "N"]} description="Create new component" />
          <Shortcut keys={["⌘", "D"]} description="Toggle dark mode" />
          <Shortcut keys={["⌘", "H"]} description="Go to dashboard" />
          <Shortcut keys={["⌘", "S"]} description="Save changes" />
          <Shortcut keys={["⌘", "F"]} description="Search in page" />
          <Shortcut keys={["Esc"]} description="Close dialog" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
