"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Plus,
  Search,
  Settings,
  Users,
  BarChart3,
  Calendar,
  FileIcon,
  Music,
  Download,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function QuickActionMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search components...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/components/new"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Component</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/components"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Search Components</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/components"))}>
              <span>Components</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/files"))}>
              <FileIcon className="mr-2 h-4 w-4" />
              <span>Files</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/audio"))}>
              <Music className="mr-2 h-4 w-4" />
              <span>Audio</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/downloads"))}>
              <Download className="mr-2 h-4 w-4" />
              <span>Downloads</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/team"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/calendar"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/help"))}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem onSelect={() => runCommand(() => logout())}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

function Button({ className, variant, children, ...props }: any) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
