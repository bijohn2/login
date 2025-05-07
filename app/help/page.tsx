import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { HelpContent } from "@/components/help-content"

export default function HelpPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Help & Support" text="Find documentation, tutorials, and support resources." />
      <HelpContent />
    </DashboardShell>
  )
}
