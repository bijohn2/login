"use client"

import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, GitBranch, Activity, CheckCircle, Clock, AlertCircle, Smartphone } from "lucide-react"

export default function MobileAppPage() {
  const projectStats = {
    completion: 45,
    totalFeatures: 16,
    completedFeatures: 7,
    inProgressFeatures: 6,
    pendingFeatures: 3,
    teamMembers: 4,
    lastUpdated: "1 hour ago",
  }

  const teamMembers = [
    { name: "Alex Rodriguez", role: "Mobile Lead", avatar: "/placeholder.svg" },
    { name: "Lisa Park", role: "iOS Developer", avatar: "/placeholder.svg" },
    { name: "Tom Wilson", role: "Android Dev", avatar: "/placeholder.svg" },
    { name: "Maya Singh", role: "UI/UX Designer", avatar: "/placeholder.svg" },
  ]

  const recentActivity = [
    { action: "Authentication flow completed", user: "Alex Rodriguez", time: "1 hour ago", type: "complete" },
    { action: "Push notifications implemented", user: "Lisa Park", time: "3 hours ago", type: "update" },
    { action: "Profile screen in review", user: "Tom Wilson", time: "5 hours ago", type: "review" },
    { action: "Navigation redesigned", user: "Maya Singh", time: "8 hours ago", type: "update" },
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
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Smartphone className="h-8 w-8" />
                  Mobile App
                </h1>
                <p className="text-muted-foreground">Cross-platform mobile application for iOS and Android</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                In Progress
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
                  <CardTitle className="text-sm font-medium">Features</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projectStats.completedFeatures}/{projectStats.totalFeatures}
                  </div>
                  <p className="text-xs text-muted-foreground">{projectStats.inProgressFeatures} in progress</p>
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
                  <div className="text-2xl font-bold">1h</div>
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

            {/* Feature Status */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Status</CardTitle>
                <CardDescription>Overview of all features in the mobile app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <Badge variant="outline" className="text-green-600">
                        {projectStats.completedFeatures}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.completedFeatures / projectStats.totalFeatures) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">In Progress</span>
                      <Badge variant="outline" className="text-blue-600">
                        {projectStats.inProgressFeatures}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.inProgressFeatures / projectStats.totalFeatures) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pending</span>
                      <Badge variant="outline" className="text-gray-600">
                        {projectStats.pendingFeatures}
                      </Badge>
                    </div>
                    <Progress value={(projectStats.pendingFeatures / projectStats.totalFeatures) * 100} />
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
