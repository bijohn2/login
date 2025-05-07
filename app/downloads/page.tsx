import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DownloadsManager } from "@/components/downloads-manager"
import { AuthGuard } from "@/components/auth-guard"

export default function DownloadsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Downloads" text="Access and download all your files and resources in one place." />
        <Suspense fallback={<div>Loading downloads...</div>}>
          <DownloadsManager />
        </Suspense>
      </DashboardShell>
    </AuthGuard>
  )
}
