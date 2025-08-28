import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentsTable } from "@/components/components-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Components - TRACKERR",
  description: "Manage and track all your website components in one place",
}

export default function ComponentsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Components</h1>
            <p className="text-muted-foreground">Manage and track all your website components in one place.</p>
          </div>
          <Button asChild>
            <Link href="/components/new">
              <Plus className="mr-2 h-4 w-4" />
              New Component
            </Link>
          </Button>
        </div>
        <ComponentsTable />
      </div>
    </DashboardShell>
  )
}
