import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentCalendar } from "@/components/component-calendar"

export default function CalendarPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="View component deadlines and milestones in a calendar format." />
      <ComponentCalendar />
    </DashboardShell>
  )
}
