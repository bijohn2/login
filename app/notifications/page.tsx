import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NotificationsManager } from "@/components/notifications-manager"
import { AuthGuard } from "@/components/auth-guard"

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
