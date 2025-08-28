"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ChevronRight,
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Bell,
  HelpCircle,
  Download,
  Database,
  Zap,
  Shield,
  Headphones,
  FolderOpen,
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
  user: {
    name: "Developer",
    email: "dev@trackerr.com",
    avatar: "/avatars/developer.jpg",
  },
  teams: [
    {
      name: "TRACKERR Enterprise",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Development Team",
      logo: AudioWaveform,
      plan: "Pro",
    },
    {
      name: "Design Studio",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      iconClass: "home",
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      iconClass: "analytics",
      items: [
        {
          title: "Overview",
          url: "/analytics",
        },
        {
          title: "Progress",
          url: "/analytics/progress",
        },
        {
          title: "Team",
          url: "/analytics/team",
        },
      ],
    },
    {
      title: "Components",
      url: "/components",
      icon: FileText,
      iconClass: "components",
      items: [
        {
          title: "All Components",
          url: "/components",
        },
        {
          title: "New Component",
          url: "/components/new",
        },
      ],
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
      iconClass: "team",
      items: [
        {
          title: "Overview",
          url: "/team",
        },
        {
          title: "Invite Members",
          url: "/team/invite",
        },
        {
          title: "Roles",
          url: "/team/roles",
        },
      ],
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
      iconClass: "calendar",
    },
    {
      title: "Audio",
      url: "/audio",
      icon: Headphones,
      iconClass: "audio",
      items: [
        {
          title: "Audio Library",
          url: "/audio",
        },
        {
          title: "Upload Audio",
          url: "/audio/upload",
        },
        {
          title: "Voice Input Demo",
          url: "/voice-input-demo",
        },
      ],
    },
    {
      title: "Files",
      url: "/files",
      icon: FolderOpen,
      iconClass: "files",
      items: [
        {
          title: "File Manager",
          url: "/files",
        },
        {
          title: "Upload Files",
          url: "/files/upload",
        },
      ],
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Zap,
      iconClass: "integrations",
      items: [
        {
          title: "Overview",
          url: "/integrations",
        },
        {
          title: "Supabase",
          url: "/integrations/supabase",
        },
        {
          title: "Vercel Blob",
          url: "/integrations/blob",
        },
        {
          title: "Google Sheets",
          url: "/integrations/google-sheets",
        },
        {
          title: "AI Capabilities",
          url: "/integrations/ai",
        },
        {
          title: "API Settings",
          url: "/integrations/api",
        },
      ],
    },
    {
      title: "Data Management",
      url: "/data-management",
      icon: Database,
      iconClass: "database",
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      iconClass: "notifications",
    },
    {
      title: "Downloads",
      url: "/downloads",
      icon: Download,
      iconClass: "downloads",
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      iconClass: "help",
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Bot,
      iconClass: "feedback",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      iconClass: "settings",
    },
  ],
  adminNav: [
    {
      title: "Admin",
      url: "/admin",
      icon: Shield,
      iconClass: "admin",
      items: [
        {
          title: "Users",
          url: "/admin/users",
        },
        {
          title: "Settings",
          url: "/admin/settings",
        },
        {
          title: "Support",
          url: "/admin/support",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design System",
      url: "/projects/design-system",
      icon: Frame,
      iconClass: "projects",
    },
    {
      name: "Sales & Marketing",
      url: "/projects/marketing-site",
      icon: PieChart,
      iconClass: "projects",
    },
    {
      name: "Travel",
      url: "/projects/mobile-app",
      icon: Map,
      iconClass: "projects",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isAdmin } = useAuth()
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({})

  // Combine main nav with admin nav if user is admin
  const allNavItems = React.useMemo(() => {
    return isAdmin() ? [...data.navMain, ...data.adminNav] : data.navMain
  }, [isAdmin])

  // Auto-expand sections based on current route
  React.useEffect(() => {
    const newOpenSections: Record<string, boolean> = {}

    allNavItems.forEach((item) => {
      if (item.items) {
        const isActive = item.items.some((subItem) => pathname === subItem.url) || pathname === item.url
        newOpenSections[item.title] = isActive
      }
    })

    setOpenSections(newOpenSections)
  }, [pathname, allNavItems])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allNavItems.map((item, index) => {
                const isActive =
                  pathname === item.url || (item.items && item.items.some((subItem) => pathname === subItem.url))

                if (item.items && item.items.length > 0) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      open={openSections[item.title]}
                      onOpenChange={() => toggleSection(item.title)}
                    >
                      <SidebarMenuItem className="sidebar-item" style={{ animationDelay: `${index * 0.05}s` }}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                            {item.icon && (
                              <item.icon className={cn("menu-icon", item.iconClass, isActive && "active")} />
                            )}
                            <span>{item.title}</span>
                            <ChevronRight
                              className={cn(
                                "ml-auto transition-transform duration-200",
                                openSections[item.title] ? "rotate-90" : "",
                              )}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="sidebar-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon className={cn("menu-icon", item.iconClass, pathname === item.url && "active")} />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
