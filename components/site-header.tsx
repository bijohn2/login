"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Plus, LogIn, LogOut, Menu } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Logo } from "@/components/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 md:px-6 transition-all duration-200 backdrop-blur-sm",
        isScrolled && "shadow-sm",
      )}
    >
      <div className="flex items-center md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:flex">
        <SidebarTrigger />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size="md" showText={true} />
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div
                className={cn(
                  "hidden md:block transition-all duration-200",
                  isSearchOpen ? "w-[300px] lg:w-[400px]" : "w-[200px] lg:w-[300px]",
                )}
              >
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                    onClick={() => setIsSearchOpen(true)}
                  />
                  <input
                    type="search"
                    placeholder="Search components..."
                    className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <NotificationsDropdown />
              </div>
              <div className="hidden sm:block">
                <Link href="/components/new">
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    <span className="hidden md:inline">New Component</span>
                    <span className="md:hidden">New</span>
                  </Button>
                </Link>
              </div>
              <div className="hidden sm:block">
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Log out</span>
                </Button>
              </div>
              <div className="block sm:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                    <div className="flex flex-col gap-4 py-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="search"
                          placeholder="Search components..."
                          className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                        />
                      </div>
                      <Link href="/components/new" className="w-full">
                        <Button className="w-full" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          New Component
                        </Button>
                      </Link>
                      <Link href="/notifications" className="w-full">
                        <Button variant="outline" className="w-full" size="sm">
                          Notifications
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <Button size="sm" onClick={() => router.push("/login")}>
              <LogIn className="mr-1 h-4 w-4" />
              <span className="hidden md:inline">Log in</span>
              <span className="md:hidden">Login</span>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
