"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    completed: 8,
    inProgress: 2,
    efficiency: 95,
  },
  {
    name: "John Smith",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    completed: 6,
    inProgress: 3,
    efficiency: 88,
  },
  {
    name: "Mike Johnson",
    role: "UI Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    completed: 4,
    inProgress: 1,
    efficiency: 92,
  },
  {
    name: "Sarah Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    completed: 5,
    inProgress: 2,
    efficiency: 85,
  },
]

export default function TeamPerformancePage() {
  return (
    <AuthGuard>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Team Performance</h1>
              <p className="text-muted-foreground">Individual team member analytics and performance metrics</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Tasks</span>
                    <Badge variant="default">{member.completed}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Badge variant="secondary">{member.inProgress}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Efficiency</span>
                      <span className="text-sm font-medium">{member.efficiency}%</span>
                    </div>
                    <Progress value={member.efficiency} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </AuthGuard>
  )
}
