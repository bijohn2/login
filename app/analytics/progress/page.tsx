"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ProgressReportsPage() {
  return (
    <AuthGuard>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
              <p className="text-muted-foreground">Detailed progress tracking and reporting</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Components completed this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Navigation Component</span>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <Progress value={100} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hero Section</span>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <Progress value={75} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Footer Component</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Progress value={25} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Progress summary for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">18/24</div>
                  <p className="text-sm text-muted-foreground">Components completed</p>
                  <Progress value={75} />
                  <p className="text-xs text-muted-foreground">75% completion rate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Individual contributor progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jane Doe</span>
                    <span className="text-sm font-medium">8 completed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">John Smith</span>
                    <span className="text-sm font-medium">6 completed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mike Johnson</span>
                    <span className="text-sm font-medium">4 completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </AuthGuard>
  )
}
