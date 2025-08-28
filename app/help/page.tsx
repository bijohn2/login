import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { HelpContent } from "@/components/help-content"

export const metadata: Metadata = {
  title: "Help & Support | Project Component Tracker",
  description: "Find documentation, tutorials, and support resources.",
}

export default function HelpPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Help & Support" text="Find documentation, tutorials, and support resources." />
      <HelpContent />
    </DashboardShell>
  )
}
