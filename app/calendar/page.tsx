import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentCalendar } from "@/components/component-calendar"
import "./calendar.css"

export const metadata: Metadata = {
  title: "Calendar | Project Component Tracker",
  description: "View component deadlines and milestones in a calendar format.",
}

export default function CalendarPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="View component deadlines and milestones in a calendar format." />
      <ComponentCalendar />
    </DashboardShell>
  )
}
