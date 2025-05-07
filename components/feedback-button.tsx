"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export function FeedbackButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenFeedback = () => {
    setIsOpen(false)
    router.push("/feedback")
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full h-14 w-14 shadow-lg" aria-label="Give Feedback">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Feedback</DialogTitle>
                <DialogDescription>
                  We'd love to hear your thoughts on how we can improve the Component Tracker.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>
                  Your feedback helps us make the Component Tracker better for everyone. Please take a moment to share
                  your thoughts with us.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleOpenFeedback}>Give Feedback</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
