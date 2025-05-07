import type { Metadata } from "next"
import { SupabaseConfigForm } from "@/components/supabase-config-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TutorialTrigger } from "@/components/tutorial-trigger"

export const metadata: Metadata = {
  title: "Supabase Integration | Project Component Tracker",
  description: "Configure Supabase integration for database storage",
}

export default function SupabaseIntegrationPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Supabase Integration</h1>
            <p className="text-muted-foreground mt-2">Configure Supabase for database storage and authentication</p>
          </div>
        </div>
        <TutorialTrigger tutorialId="supabase-integration" />
      </div>

      <SupabaseConfigForm />
    </div>
  )
}
