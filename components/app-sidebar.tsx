"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  ListChecks,
  Users,
  BarChart3,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  MessageSquare,
  FileIcon,
  Download,
  MessageCircle,
  Music,
  Plug,
  Database,
  Mic,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Components",
    url: "/components",
    icon: ListChecks,
    badge: null,
  },
  {
    title: "Files",
    url: "/files",
    icon: FileIcon,
    badge: null,
  },
  {
    title: "Audio",
    url: "/audio",
    icon: Music,
    badge: null,
  },
  {
    title: "Downloads",
    url: "/downloads",
    icon: Download,
    badge: null,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
    badge: null,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageCircle,
    badge: { text: "New", variant: "default" },
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: Plug,
    badge: null,
  },
  {
    title: "Data Management",
    url: "/data-management",
    icon: Database,
    badge: null,
  },
  {
    title: "Voice Input",
    url: "/voice-input-demo",
    icon: Mic,
    badge: { text: "Beta", variant: "secondary" },
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
    badge: null,
  },
]

// Admin items
const adminItems = [
  {
    title: "Support Requests",
    url: "/admin/support",
    icon: MessageSquare,
    badge: { text: "3", variant: "destructive" },
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Check if the current path matches the item URL
  const isActive = (url: string) => {
    if (url === "/" && pathname === "/") return true
    if (url !== "/" && pathname.startsWith(url)) return true
    return false
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) {
    return null
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-2 px-2">
          <Logo size="md" showText={!isMobile} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
                          <Link href={item.url} className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge
                                variant={item.badge.variant as "default" | "secondary" | "destructive"}
                                className="ml-auto"
                              >
                                {item.badge.text}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin section - only visible to admins */}
        {user.role === "Project Manager" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
                            <Link href={item.url} className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <item.icon />
                                <span>{item.title}</span>
                              </div>
                              {item.badge && (
                                <Badge
                                  variant={item.badge.variant as "default" | "secondary" | "destructive"}
                                  className="ml-auto"
                                >
                                  {item.badge.text}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.title}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
