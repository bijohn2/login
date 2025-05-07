import type { Metadata } from "next"
import { BlobConfigForm } from "@/components/blob-config-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TutorialTrigger } from "@/components/tutorial-trigger"

export const metadata: Metadata = {
  title: "Vercel Blob Integration | Project Component Tracker",
  description: "Configure Vercel Blob integration for file storage",
}

export default function BlobIntegrationPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/integrations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vercel Blob Integration</h1>
            <p className="text-muted-foreground mt-2">Configure Vercel Blob for enhanced file and audio storage</p>
          </div>
        </div>
        <TutorialTrigger tutorialId="blob-integration" />
      </div>

      <BlobConfigForm />
    </div>
  )
}
