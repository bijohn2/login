import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FeedbackForm } from "@/components/feedback-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Feedback | Project Component Tracker",
  description: "We value your input! Help us improve by sharing your thoughts and suggestions.",
}

export default function FeedbackPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader
          heading="Feedback"
          text="We value your input! Help us improve by sharing your thoughts and suggestions."
        />
        <FeedbackForm />
      </DashboardShell>
    </AuthGuard>
  )
}
