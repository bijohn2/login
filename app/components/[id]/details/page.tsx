import { notFound } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ComponentDetails } from "@/components/component-details"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"
import { getComponentById } from "@/lib/data"

interface ComponentDetailsPageProps {
  params: {
    id: string
  }
}

export default async function ComponentDetailsPage({ params }: ComponentDetailsPageProps) {
  const component = await getComponentById(params.id)

  if (!component) {
    notFound()
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/components">
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Components
              </Button>
            </Link>
          </div>
          <Link href={`/components/${params.id}`}>
            <Button size="sm">
              <Edit className="mr-1 h-4 w-4" />
              Edit Component
            </Button>
          </Link>
        </div>
        <DashboardHeader heading={component.name} text="Component details and information." />
        <ComponentDetails component={component} />
      </div>
    </DashboardShell>
  )
}
