import { Suspense } from "react"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentForm } from "@/components/component-form"
import { ComponentFormSkeleton } from "@/components/component-form-skeleton"
import { getComponentById } from "@/lib/data"
import { AuthGuard } from "@/components/auth-guard"

interface ComponentPageProps {
  params: {
    id: string
  }
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const component = getComponentById(params.id)

  if (!component) {
    notFound()
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading={`Edit Component: ${component.name}`} text="Update component details and settings." />
        <Suspense fallback={<ComponentFormSkeleton />}>
          <ComponentForm component={component} />
        </Suspense>
      </DashboardShell>
    </AuthGuard>
  )
}
