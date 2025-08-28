"use client"

import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, GitBranch, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function DesignSystemPage() {
  const projectStats = {
    completion: 75,
    totalComponents: 24,
    completedComponents: 18,
    inProgressComponents: 4,
    pendingComponents: 2,
    teamMembers: 6,
    lastUpdated: "2 hours ago",
  }

  const teamMembers = [
    { name: "Sarah Chen", role: "Lead Designer", avatar: "/placeholder.svg" },
    { name: "Mike Johnson", role: "Frontend Dev", avatar: "/placeholder.svg" },
    { name: "Emma Wilson", role: "UX Designer", avatar: "/placeholder.svg" },
    { name: "David Kim", role: "Developer", avatar: "/placeholder.svg" },
  ]

  const recentActivity = [
    { action: "Button component updated", user: "Sarah Chen", time: "2 hours ago", type: "update" },
    { action: "Card component completed", user: "Mike Johnson", time: "4 hours ago", type: "complete" },
    { action: "Modal component in review", user: "Emma Wilson", time: "6 hours ago", type: "review" },
    { action: "Typography system finalized", user: "David Kim", time: "1 day ago", type: "complete" },
  ]

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Project Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Design System</h1>
                <p className="text-muted-foreground">Comprehensive component library and design tokens</p>
              </div>
              <Badge variant="default" className="text-sm">
                Active
              </Badge>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progress</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projectStats.completion}%</div>
                  <Progress value={projectStats.completion} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Components</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projectStats.completedComponents}/{projectStats.totalComponents}
                  </div>
                  <p className="text-xs text-muted-foreground">{projectStats.inProgressComponents} in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projectStats.teamMembers}</div>
                  <p className="text-xs text-muted-foreground">Active members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2h</div>
                  <p className="text-xs text-muted-foreground">ago</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>People working on this project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1">
                        {activity.type === "complete" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {activity.type === "update" && <GitBranch className="h-4 w-4 text-blue-500" />}
                        {activity.type === "review" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Component Status */}
            <Card>
              <CardHeader>
                <CardTitle>Component Status</CardTitle>
                <CardDescription>Overview of all components in the design system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <Badge variant="outline" className="text-green-600">
                        {projectStats.completedComponents}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.completedComponents / projectStats.totalComponents) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">In Progress</span>
                      <Badge variant="outline" className="text-blue-600">
                        {projectStats.inProgressComponents}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.inProgressComponents / projectStats.totalComponents) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pending</span>
                      <Badge variant="outline" className="text-gray-600">
                        {projectStats.pendingComponents}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.pendingComponents / projectStats.totalComponents) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
