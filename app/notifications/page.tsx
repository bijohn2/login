import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NotificationsManager } from "@/components/notifications-manager"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Notifications | Project Component Tracker",
  description: "View and manage all your notifications.",
}

export default function NotificationsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Notifications" text="View and manage all your notifications." />
        <NotificationsManager />
      </DashboardShell>
    </AuthGuard>
  )
}
