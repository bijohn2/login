"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()

  // Route mapping for better breadcrumb names
  const routeMap: Record<string, string> = {
    "/": "Dashboard",
    "/components": "Components",
    "/components/new": "New Component",
    "/analytics": "Analytics",
    "/analytics/progress": "Progress Reports",
    "/analytics/team": "Team Performance",
    "/calendar": "Calendar",
    "/team": "Team Members",
    "/team/roles": "Roles & Permissions",
    "/team/invite": "Invite Members",
    "/files": "Files",
    "/files/upload": "Upload Files",
    "/audio": "Audio Library",
    "/audio/upload": "Upload Audio",
    "/voice-input-demo": "Voice Input Demo",
    "/integrations": "Integrations",
    "/integrations/supabase": "Supabase",
    "/integrations/blob": "Vercel Blob",
    "/integrations/google-sheets": "Google Sheets",
    "/integrations/ai": "AI Assistant",
    "/integrations/api": "API Configuration",
    "/data-management": "Data Management",
    "/downloads": "Downloads",
    "/notifications": "Notifications",
    "/feedback": "Feedback",
    "/admin/support": "Support Tickets",
    "/admin/users": "User Management",
    "/admin/settings": "System Settings",
    "/help": "Help & Support",
    "/settings": "Settings",
    "/projects/design-system": "Design System",
    "/projects/mobile-app": "Mobile App",
    "/projects/marketing-site": "Marketing Site",
    "/search": "Search Results",
  }

  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathname === "/") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/")
          const isLast = index === pathSegments.length - 1
          const name = routeMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <div key={path} className="flex items-center">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
