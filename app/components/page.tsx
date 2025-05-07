import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentsTable } from "@/components/components-table"
import { ComponentsTableSkeleton } from "@/components/components-table-skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

export default function ComponentsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="flex items-center justify-between">
          <DashboardHeader heading="Components" text="Manage and track all components in your project." />
          <Link href="/components/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Component
            </Button>
          </Link>
        </div>
        <Suspense fallback={<ComponentsTableSkeleton />}>
          <ComponentsTable />
        </Suspense>
      </DashboardShell>
    </AuthGuard>
  )
}
