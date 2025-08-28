"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Edit } from "lucide-react"

const roles = [
  {
    name: "Project Manager",
    description: "Full access to all features and settings",
    permissions: ["Create/Edit Components", "Manage Team", "View Analytics", "Admin Access"],
    members: 1,
    color: "bg-red-100 text-red-800",
  },
  {
    name: "Developer",
    description: "Can create and edit components, view analytics",
    permissions: ["Create/Edit Components", "View Analytics", "Upload Files"],
    members: 3,
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Designer",
    description: "Can create components and upload design files",
    permissions: ["Create Components", "Upload Files", "View Components"],
    members: 2,
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Viewer",
    description: "Read-only access to components and analytics",
    permissions: ["View Components", "View Analytics"],
    members: 2,
    color: "bg-gray-100 text-gray-800",
  },
]

export default function RolesPermissionsPage() {
  return (
    <AuthGuard>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
              <p className="text-muted-foreground">Manage team member roles and access permissions</p>
            </div>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {role.name}
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={role.color}>
                        <Users className="mr-1 h-3 w-3" />
                        {role.members}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Permissions:</h4>
                    <div className="space-y-1">
                      {role.permissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
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
