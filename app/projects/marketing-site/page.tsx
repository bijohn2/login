"use client"

import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Activity, CheckCircle, Clock, Globe } from "lucide-react"

export default function MarketingSitePage() {
  const projectStats = {
    completion: 100,
    totalPages: 8,
    completedPages: 8,
    inProgressPages: 0,
    pendingPages: 0,
    teamMembers: 3,
    lastUpdated: "3 days ago",
  }

  const teamMembers = [
    { name: "Jennifer Lee", role: "Marketing Lead", avatar: "/placeholder.svg" },
    { name: "Carlos Martinez", role: "Web Developer", avatar: "/placeholder.svg" },
    { name: "Sophie Turner", role: "Content Writer", avatar: "/placeholder.svg" },
  ]

  const recentActivity = [
    { action: "Site launched successfully", user: "Carlos Martinez", time: "3 days ago", type: "complete" },
    { action: "SEO optimization completed", user: "Jennifer Lee", time: "4 days ago", type: "complete" },
    { action: "Final content review done", user: "Sophie Turner", time: "5 days ago", type: "complete" },
    { action: "Performance testing passed", user: "Carlos Martinez", time: "6 days ago", type: "complete" },
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
                  <Globe className="h-8 w-8" />
                  Marketing Site
                </h1>
                <p className="text-muted-foreground">Company marketing website with landing pages and content</p>
              </div>
              <Badge variant="outline" className="text-sm text-green-600 border-green-600">
                Completed
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
                  <div className="text-2xl font-bold text-green-600">{projectStats.completion}%</div>
                  <Progress value={projectStats.completion} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pages</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projectStats.completedPages}/{projectStats.totalPages}
                  </div>
                  <p className="text-xs text-muted-foreground">All pages completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projectStats.teamMembers}</div>
                  <p className="text-xs text-muted-foreground">Team members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3d</div>
                  <p className="text-xs text-muted-foreground">ago</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>People who worked on this project</CardDescription>
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
                  <CardDescription>Project completion timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
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

            {/* Project Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>Complete overview of the marketing site project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Completed Pages</h4>
                    <div className="space-y-2">
                      {[
                        "Homepage",
                        "About Us",
                        "Services",
                        "Portfolio",
                        "Blog",
                        "Contact",
                        "Privacy Policy",
                        "Terms of Service",
                      ].map((page, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{page}</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Key Features</h4>
                    <div className="space-y-2">
                      {[
                        "Responsive Design",
                        "SEO Optimized",
                        "Fast Loading",
                        "Contact Forms",
                        "Blog System",
                        "Analytics Integration",
                        "Social Media Links",
                        "Newsletter Signup",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{feature}</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      ))}
                    </div>
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
