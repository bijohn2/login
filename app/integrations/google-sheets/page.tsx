import type { Metadata } from "next"
import { GoogleSheetsConfigForm } from "@/components/google-sheets-config-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TutorialTrigger } from "@/components/tutorial-trigger"

export const metadata: Metadata = {
  title: "Google Sheets Integration | Project Component Tracker",
  description: "Configure Google Sheets integration for data import/export",
}

export default function GoogleSheetsIntegrationPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Google Sheets Integration</h1>
            <p className="text-muted-foreground mt-2">Configure Google Sheets for data import and export</p>
          </div>
        </div>
        <TutorialTrigger tutorialId="google-sheets-integration" />
      </div>

      <GoogleSheetsConfigForm />
    </div>
  )
}
