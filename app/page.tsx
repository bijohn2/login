import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardStats } from "@/components/dashboard-stats"
import { ComponentsChart } from "@/components/components-chart"
import { Logo } from "@/components/logo"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Welcome Section with Large Logo */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Logo size="2xl" className="mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">Welcome to TRACKERR</h1>
          <p className="text-xl text-muted-foreground mt-2">Your comprehensive component tracking dashboard</p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Components Chart */}
        <div className="grid gap-4">
          <ComponentsChart />
        </div>
      </div>
    </DashboardShell>
  )
}
