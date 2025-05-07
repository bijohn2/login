import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentForm } from "@/components/component-form"
import { ComponentFormSkeleton } from "@/components/component-form-skeleton"

export default function NewComponentPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Component" text="Create a new component for your project." />
      <Suspense fallback={<ComponentFormSkeleton />}>
        <ComponentForm />
      </Suspense>
    </DashboardShell>
  )
}
