import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FeedbackForm } from "@/components/feedback-form"
import { AuthGuard } from "@/components/auth-guard"

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
