"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download, Upload } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your component tracking and project progress</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button size="sm" asChild>
          <a href="/components/new">
            <Plus className="mr-2 h-4 w-4" />
            New Component
          </a>
        </Button>
      </div>
    </div>
  )
}
