import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export const metadata: Metadata = {
  title: "Analytics - TRACKERR",
  description: "View detailed analytics and insights for your components and projects",
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            View detailed analytics and insights for your components and projects.
          </p>
        </div>
        <AnalyticsDashboard />
      </div>
    </DashboardShell>
  )
}
