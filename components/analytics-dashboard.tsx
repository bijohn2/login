"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getComponentStats } from "@/lib/data"
import { ComponentStatusChart } from "@/components/component-status-chart"
import { ComponentPriorityChart } from "@/components/component-priority-chart"
import { ComponentProgressChart } from "@/components/component-progress-chart"

export function AnalyticsDashboard() {
  const stats = getComponentStats()

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
        <TabsTrigger value="priority">Priority</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.total}</div>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/80">+{stats.newThisWeek} this week</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{stats.inProgress}</div>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80">{stats.inProgressPercent}% of total</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.completed}</div>
              <p className="text-xs text-green-600/80 dark:text-green-400/80">{stats.completedPercent}% of total</p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">{stats.highPriority}</div>
              <p className="text-xs text-rose-600/80 dark:text-rose-400/80">{stats.highPriorityPercent}% of total</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Component Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ComponentStatusChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ComponentPriorityChart />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="status" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Component Status</CardTitle>
            <CardDescription>Distribution of components by their current status</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px]">
              <ComponentStatusChart />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="priority" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Component Priority</CardTitle>
            <CardDescription>Distribution of components by priority level</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px]">
              <ComponentPriorityChart />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="progress" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Weekly progress of component completion</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px]">
              <ComponentProgressChart />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
