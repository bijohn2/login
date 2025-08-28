import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Settings - TRACKERR",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}
