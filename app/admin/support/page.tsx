import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Support Tickets - Admin - TRACKERR",
  description: "Manage and respond to user support tickets",
}

// Mock support tickets data
const supportTickets = [
  {
    id: "TICK-001",
    title: "Unable to upload audio files",
    description: "Getting error when trying to upload MP3 files larger than 10MB",
    status: "new",
    priority: "high",
    category: "technical",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2025-08-15T10:30:00Z",
    updatedAt: "2025-08-15T10:30:00Z",
  },
  {
    id: "TICK-002",
    title: "Feature request: Dark mode toggle",
    description: "Would love to have a dark mode option for better night-time usage",
    status: "in-progress",
    priority: "medium",
    category: "feature",
    user: {
      name: "Mike Chen",
      email: "mike.chen@startup.io",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2025-08-14T15:45:00Z",
    updatedAt: "2025-08-15T09:20:00Z",
  },
  {
    id: "TICK-003",
    title: "Billing question about enterprise plan",
    description: "Need clarification on the pricing for additional team members",
    status: "resolved",
    priority: "low",
    category: "billing",
    user: {
      name: "Emily Rodriguez",
      email: "emily.r@enterprise.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2025-08-13T11:20:00Z",
    updatedAt: "2025-08-14T16:30:00Z",
  },
  {
    id: "TICK-004",
    title: "Components not syncing properly",
    description: "Changes made to components are not reflecting in the dashboard",
    status: "closed",
    priority: "high",
    category: "technical",
    user: {
      name: "David Kim",
      email: "david.kim@agency.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2025-08-12T14:15:00Z",
    updatedAt: "2025-08-13T10:45:00Z",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new":
      return <AlertCircle className="h-4 w-4" />
    case "in-progress":
      return <Clock className="h-4 w-4" />
    case "resolved":
      return <CheckCircle className="h-4 w-4" />
    case "closed":
      return <XCircle className="h-4 w-4" />
    default:
      return <MessageSquare className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminSupportPage() {
  const ticketStats = {
    total: supportTickets.length,
    new: supportTickets.filter((t) => t.status === "new").length,
    inProgress: supportTickets.filter((t) => t.status === "in-progress").length,
    resolved: supportTickets.filter((t) => t.status === "resolved").length,
    closed: supportTickets.filter((t) => t.status === "closed").length,
  }

  const filterTickets = (status?: string) => {
    if (!status) return supportTickets
    return supportTickets.filter((ticket) => ticket.status === status)
  }

  const TicketCard = ({ ticket }: { ticket: (typeof supportTickets)[0] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{ticket.title}</CardTitle>
            <CardDescription className="text-sm">
              Ticket #{ticket.id} • {ticket.category}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Assign to Me</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Close Ticket</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{ticket.user.name}</p>
                <p className="text-muted-foreground">{ticket.user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{formatDate(ticket.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
            <Badge className={getStatusColor(ticket.status)}>
              <span className="flex items-center space-x-1">
                {getStatusIcon(ticket.status)}
                <span>{ticket.status.replace("-", " ")}</span>
              </span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and respond to user support requests and issues.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ticketStats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{ticketStats.new}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{ticketStats.inProgress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{ticketStats.resolved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <XCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{ticketStats.closed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="new">New ({ticketStats.new})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({ticketStats.inProgress})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({ticketStats.resolved})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({ticketStats.closed})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterTickets().map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            {filterTickets("new").map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {filterTickets("in-progress").map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {filterTickets("resolved").map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {filterTickets("closed").map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
