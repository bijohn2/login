import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ComponentsChart } from "@/components/components-chart"
import { ComponentsStatusPieChart } from "@/components/components-status-pie-chart"
import { ComponentsPriorityPieChart } from "@/components/components-priority-pie-chart"
import { ComponentsProgressChart } from "@/components/components-progress-chart"
import { getAllComponents } from "@/lib/data"

export default async function AnalyticsPage() {
  // Safely fetch components with error handling
  const components = await getAllComponents().catch(() => [])

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your component development progress and analyze trends.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="priority">Priority</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components Overview</CardTitle>
              <CardDescription>Track the number of components created over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <ComponentsChart components={components || []} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components by Status</CardTitle>
              <CardDescription>Distribution of components by their current status.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <ComponentsStatusPieChart components={components || []} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="priority" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components by Priority</CardTitle>
              <CardDescription>Distribution of components by their priority level.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <ComponentsPriorityPieChart components={components || []} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components Progress</CardTitle>
              <CardDescription>Track the progress of components over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <ComponentsProgressChart components={components || []} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
