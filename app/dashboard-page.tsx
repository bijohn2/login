"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { ComponentsChart } from "@/components/components-chart"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Play,
  BookOpen,
  Video,
  FileText,
  ArrowRight,
  Component,
} from "lucide-react"

const recentActivities = [
  {
    id: 1,
    user: "Jane Doe",
    action: "completed",
    target: "Navigation Component",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "completion",
  },
  {
    id: 2,
    user: "John Smith",
    action: "started working on",
    target: "Hero Section",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "progress",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "requested review for",
    target: "Footer Component",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "review",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "commented on",
    target: "Contact Form",
    time: "August 15, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "comment",
  },
]

export default function DashboardPage() {
  return (
    <AuthGuard>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <DashboardShell>
          <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            {/* Welcome Section with Large Logo */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
              <Logo size="2xl" showText={true} />
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Welcome to TRACKERR</h1>
                <p className="text-lg md:text-xl text-muted-foreground mt-2">
                  Your comprehensive component management dashboard
                </p>
              </div>
            </div>

            <DashboardHeader />

            <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}>
              <DashboardStats />
            </Suspense>

            {/* Charts Section - Full Width and Responsive */}
            <div className="w-full">
              <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
                <ComponentsChart />
              </Suspense>
            </div>

            {/* Bottom Section - Activities and Quick Actions */}
            <div className="grid gap-4 md:gap-8 grid-cols-1 xl:grid-cols-2">
              {/* Recent Activities */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Latest updates from your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        {activity.type === "completion" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {activity.type === "progress" && <Clock className="h-4 w-4 text-blue-600" />}
                        {activity.type === "review" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        {activity.type === "comment" && <FileText className="h-4 w-4 text-gray-600" />}
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full mt-4">
                    View All Activities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks to help you get things done</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      <Component className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="text-sm font-medium">Create Component</h4>
                      <p className="text-xs text-muted-foreground">Add a new component to track</p>
                    </div>
                    <Button size="sm" variant="outline" asChild className="flex-shrink-0 bg-transparent">
                      <a href="/components/new">Create</a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="text-sm font-medium">Invite Team</h4>
                      <p className="text-xs text-muted-foreground">Add team members to collaborate</p>
                    </div>
                    <Button size="sm" variant="outline" asChild className="flex-shrink-0 bg-transparent">
                      <a href="/team">Invite</a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="text-sm font-medium">Watch Tutorial</h4>
                      <p className="text-xs text-muted-foreground">Learn how to use TRACKERR</p>
                    </div>
                    <Button size="sm" variant="outline" asChild className="flex-shrink-0 bg-transparent">
                      <a href="/help">Watch</a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="text-sm font-medium">Read Documentation</h4>
                      <p className="text-xs text-muted-foreground">Explore comprehensive guides</p>
                    </div>
                    <Button size="sm" variant="outline" asChild className="flex-shrink-0 bg-transparent">
                      <a href="/docs/authentication">Read</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardShell>
      </SidebarInset>
    </AuthGuard>
  )
}
