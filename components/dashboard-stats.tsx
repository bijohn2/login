import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getComponentStats } from "@/lib/data"

export async function DashboardStats() {
  const stats = await getComponentStats()

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">{stats.newThisWeek} new this week</p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div className="h-1 bg-primary" style={{ width: "100%" }} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
          <p className="text-xs text-muted-foreground">{stats.inProgressPercent}% of total</p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div className="h-1 bg-blue-500" style={{ width: `${stats.inProgressPercent}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">{stats.completedPercent}% of total</p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div className="h-1 bg-green-500" style={{ width: `${stats.completedPercent}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.highPriority}</div>
          <p className="text-xs text-muted-foreground">{stats.highPriorityPercent}% of total</p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div className="h-1 bg-red-500" style={{ width: `${stats.highPriorityPercent}%` }} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
