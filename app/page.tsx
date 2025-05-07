import Link from "next/link"
import { Suspense } from "react"
import { ArrowRightIcon, CheckCircleIcon, ClipboardListIcon, LayoutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to TRACKERR</h1>
        <p className="text-muted-foreground">
          Your all-in-one solution for tracking website components, tasks, and project progress.
        </p>
      </div>

      {/* Welcome Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">Get Started with TRACKERR</CardTitle>
          <CardDescription>Organize your website development tasks and track progress efficiently</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <ClipboardListIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Track Components</h3>
            <p className="text-sm text-muted-foreground">Create and manage website components with detailed tracking</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <LayoutIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Visualize Progress</h3>
            <p className="text-sm text-muted-foreground">
              See real-time charts and statistics about your project status
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CheckCircleIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Collaborate</h3>
            <p className="text-sm text-muted-foreground">Assign tasks to team members and track their contributions</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/components">
              View Components <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <DashboardStats />
        </Suspense>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest project updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircleIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Navigation Bar component updated</p>
                <p className="text-sm text-muted-foreground">Status changed to In Progress</p>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ClipboardListIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New component added: Hero Section</p>
                <p className="text-sm text-muted-foreground">Assigned to Mike Johnson</p>
              </div>
              <div className="text-sm text-muted-foreground">Yesterday</div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <LayoutIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Footer component completed</p>
                <p className="text-sm text-muted-foreground">Ready for review</p>
              </div>
              <div className="text-sm text-muted-foreground">3 days ago</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href="/components">View All Components</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function StatsCardSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="mt-2 h-2 w-full" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
