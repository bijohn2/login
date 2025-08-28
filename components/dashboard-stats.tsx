"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Component, CheckCircle, Clock, Users } from "lucide-react"

const stats = [
  {
    title: "Total Components",
    value: "24",
    change: "+2 from last week",
    icon: Component,
  },
  {
    title: "Completed",
    value: "18",
    change: "+4 from last week",
    icon: CheckCircle,
  },
  {
    title: "In Progress",
    value: "4",
    change: "-1 from last week",
    icon: Clock,
  },
  {
    title: "Team Members",
    value: "8",
    change: "+1 from last week",
    icon: Users,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
