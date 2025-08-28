"use client"

import { Plus, Component, Users, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function QuickActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/components/new" className="flex items-center gap-2">
            <Component className="h-4 w-4" />
            New Component
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Invite Member
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/files/upload" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Upload File
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Event
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
