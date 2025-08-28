import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TeamMembers } from "@/components/team-members"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "Team Members | Project Component Tracker",
  description: "Manage team members and their assigned components.",
}

export default function TeamPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Team Members" text="Manage team members and their assigned components." />
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      <TeamMembers />
    </DashboardShell>
  )
}
