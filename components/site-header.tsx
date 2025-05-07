"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Plus, LogIn, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

export function SiteHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="hidden font-bold sm:inline-block">Project Component Tracker</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <form className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search components..."
                    className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <NotificationsDropdown />
              <Link href="/components/new">
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  New Component
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => router.push("/login")}>
              <LogIn className="mr-1 h-4 w-4" />
              Log in
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
