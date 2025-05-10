"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay, addDays } from "date-fns"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent } from "@/components/ui/card"
import { getAllComponents } from "@/lib/data"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { List, Plus, ChevronLeft, ChevronRight, Clock, Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Setup the localizer for the calendar
const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Define event type
interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
  status: string
  priority?: string
  description?: string
  type?: string
}

// Define event type colors
const eventTypeColors = {
  Deadline: {
    light: "#f87171", // Red
    dark: "#ef4444",
    text: "white",
  },
  Review: {
    light: "#fbbf24", // Amber
    dark: "#f59e0b",
    text: "white",
  },
  Development: {
    light: "#60a5fa", // Blue
    dark: "#3b82f6",
    text: "white",
  },
  Meeting: {
    light: "#a78bfa", // Purple
    dark: "#8b5cf6",
    text: "white",
  },
  Other: {
    light: "#94a3b8", // Slate
    dark: "#64748b",
    text: "white",
  },
}

// Define status colors
const statusColors = {
  Complete: {
    light: "#4ade80", // Green
    dark: "#22c55e",
    text: "white",
  },
  Completed: {
    light: "#4ade80", // Green
    dark: "#22c55e",
    text: "white",
  },
  "In Design": {
    light: "#c084fc", // Purple
    dark: "#a855f7",
    text: "white",
  },
  "Under Review": {
    light: "#fb923c", // Orange
    dark: "#f97316",
    text: "white",
  },
  "In Review": {
    light: "#fb923c", // Orange
    dark: "#f97316",
    text: "white",
  },
  "In Development": {
    light: "#60a5fa", // Blue
    dark: "#3b82f6",
    text: "white",
  },
  "In Progress": {
    light: "#60a5fa", // Blue
    dark: "#3b82f6",
    text: "white",
  },
  "Not Started": {
    light: "#f87171", // Red
    dark: "#ef4444",
    text: "white",
  },
  Default: {
    light: "#94a3b8", // Slate
    dark: "#64748b",
    text: "white",
  },
}

export function ComponentCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState("month")
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showAgendaDialog, setShowAgendaDialog] = useState(false)

  // Get event types from events
  const eventTypes = useMemo(() => {
    const types = new Set<string>()
    events.forEach((event) => {
      const type = getEventType(event)
      types.add(type)
    })
    return Array.from(types)
  }, [events])

  // Get statuses from events
  const statuses = useMemo(() => {
    const statusSet = new Set<string>()
    events.forEach((event) => {
      statusSet.add(event.status)
    })
    return Array.from(statusSet)
  }, [events])

  // Helper function to determine event type
  function getEventType(event: CalendarEvent): string {
    if (event.type) return event.type
    if (event.title.includes("Deadline")) return "Deadline"
    if (event.title.includes("Review")) return "Review"
    if (event.title.includes("Development")) return "Development"
    if (event.title.includes("Meeting")) return "Meeting"
    return "Other"
  }

  // Load component data and convert to calendar events
  useEffect(() => {
    const loadComponentEvents = async () => {
      try {
        // Get all components
        const components = await getAllComponents()

        if (!Array.isArray(components)) {
          console.error("Components data is not an array:", components)
          toast({
            title: "Error loading calendar",
            description: "Invalid component data format.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Generate events from components
        const componentEvents: CalendarEvent[] = []

        // Current date for reference
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

        // Create events for each component
        components.forEach((component) => {
          // Parse the last updated date
          const lastUpdated = component.updatedAt ? new Date(component.updatedAt) : new Date()

          // Create a deadline date (for demo purposes, set it to 2 weeks after last update)
          const deadlineDate = new Date(lastUpdated)
          deadlineDate.setDate(deadlineDate.getDate() + 14)

          // Create a review date (for demo purposes, set it to 1 week after last update)
          const reviewDate = new Date(lastUpdated)
          reviewDate.setDate(reviewDate.getDate() + 7)

          // Add deadline event
          componentEvents.push({
            id: `${component.id}-deadline`,
            title: `${component.name} Deadline`,
            start: deadlineDate,
            end: deadlineDate,
            allDay: true,
            status: component.status,
            priority: component.priority,
            description: `Deadline for ${component.name} component`,
            type: "Deadline",
          })

          // Add review event
          componentEvents.push({
            id: `${component.id}-review`,
            title: `${component.name} Review`,
            start: reviewDate,
            end: reviewDate,
            allDay: true,
            status: component.status,
            priority: component.priority,
            description: `Review for ${component.name} component`,
            type: "Review",
          })

          // For components in development, add a development period
          if (
            component.status === "In Development" ||
            component.status === "In Design" ||
            component.status === "In Progress"
          ) {
            const devStartDate = new Date(lastUpdated)
            const devEndDate = new Date(deadlineDate)

            componentEvents.push({
              id: `${component.id}-development`,
              title: `${component.name} Development`,
              start: devStartDate,
              end: devEndDate,
              status: component.status,
              priority: component.priority,
              description: `Development period for ${component.name} component`,
              type: "Development",
            })
          }

          // Add a team meeting for some components (for variety)
          if (Math.random() > 0.7) {
            const meetingDate = new Date(lastUpdated)
            meetingDate.setDate(meetingDate.getDate() + Math.floor(Math.random() * 10))

            // Set meeting to a reasonable time
            meetingDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0)

            const meetingEndDate = new Date(meetingDate)
            meetingEndDate.setHours(meetingEndDate.getHours() + 1)

            componentEvents.push({
              id: `${component.id}-meeting`,
              title: `${component.name} Team Meeting`,
              start: meetingDate,
              end: meetingEndDate,
              allDay: false,
              status: component.status,
              priority: component.priority,
              description: `Team meeting to discuss ${component.name} component`,
              type: "Meeting",
            })
          }
        })

        setEvents(componentEvents)
        setFilteredEvents(componentEvents)
      } catch (error) {
        console.error("Error loading calendar events:", error)
        toast({
          title: "Error loading calendar",
          description: "There was a problem loading the calendar events.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadComponentEvents()
  }, [])

  // Filter events when filters change
  useEffect(() => {
    let filtered = [...events]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter((event) => getEventType(event) === typeFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, statusFilter, typeFilter])

  // Custom event styling based on component status and type
  const eventStyleGetter = (event: CalendarEvent) => {
    const type = getEventType(event)
    const typeColor = eventTypeColors[type as keyof typeof eventTypeColors] || eventTypeColors.Other
    const statusColor = statusColors[event.status as keyof typeof statusColors] || statusColors.Default

    // Blend the colors for a unique look based on both type and status
    const backgroundColor = typeColor.dark
    const borderColor = statusColor.dark

    const style = {
      backgroundColor,
      borderLeft: `4px solid ${borderColor}`,
      borderRadius: "4px",
      opacity: 0.9,
      color: typeColor.text,
      border: `1px solid ${borderColor}`,
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
      fontSize: "0.85rem",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      transition: "all 0.2s ease",
    }

    return {
      style,
      className: "calendar-event",
    }
  }

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventDialog(true)
  }

  // Handle date navigation
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    const newDate = new Date(date)

    if (action === "PREV") {
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() - 7)
      } else if (view === "day") {
        newDate.setDate(newDate.getDate() - 1)
      }
    } else if (action === "NEXT") {
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() + 7)
      } else if (view === "day") {
        newDate.setDate(newDate.getDate() + 1)
      }
    } else if (action === "TODAY") {
      newDate.setTime(new Date().getTime())
    }

    setDate(newDate)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter(null)
    setTypeFilter(null)
  }

  // Get upcoming events for agenda view
  const upcomingEvents = useMemo(() => {
    const now = new Date()
    const nextWeek = addDays(now, 7)

    return filteredEvents
      .filter((event) => event.start >= now && event.start <= nextWeek)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
  }, [filteredEvents])

  // Custom toolbar component
  const CustomToolbar = () => {
    const viewOptions = [
      { value: "month", label: "Month" },
      { value: "week", label: "Week" },
      { value: "day", label: "Day" },
      { value: "agenda", label: "Agenda" },
    ]

    return (
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleNavigate("PREV")} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleNavigate("NEXT")} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => handleNavigate("TODAY")} className="ml-2">
              Today
            </Button>
            <h2 className="text-lg font-semibold ml-4">
              {format(date, view === "day" ? "MMMM d, yyyy" : view === "week" ? "'Week of' MMMM d, yyyy" : "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                {viewOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={showAgendaDialog} onOpenChange={setShowAgendaDialog}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <List className="h-4 w-4 mr-2" />
                  Agenda
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Upcoming Events</DialogTitle>
                  <DialogDescription>Events scheduled for the next 7 days</DialogDescription>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4 py-2">
                      {upcomingEvents.map((event) => {
                        const type = getEventType(event)
                        const typeColor = eventTypeColors[type as keyof typeof eventTypeColors] || eventTypeColors.Other

                        return (
                          <div
                            key={event.id}
                            className="flex items-start gap-4 p-3 rounded-md border hover:bg-accent/50 transition-colors"
                            style={{ borderLeft: `4px solid ${typeColor.dark}` }}
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {format(event.start, "MMM d, h:mm a")}
                                  {!event.allDay && ` - ${format(event.end, "h:mm a")}`}
                                  {event.allDay && " (All day)"}
                                </span>
                              </div>
                              {event.description && <p className="text-sm mt-2">{event.description}</p>}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge
                                variant="secondary"
                                className="text-xs"
                                style={{
                                  backgroundColor:
                                    statusColors[event.status as keyof typeof statusColors]?.light ||
                                    statusColors.Default.light,
                                  color:
                                    statusColors[event.status as keyof typeof statusColors]?.text ||
                                    statusColors.Default.text,
                                }}
                              >
                                {event.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">No upcoming events found</div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAgendaDialog(false)}>
                    Close
                  </Button>
                  <Button asChild>
                    <a href="/components">View All Components</a>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new event on your calendar</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* This would be a form to add new events */}
                  <p className="text-sm text-muted-foreground">
                    This feature would allow you to create new events directly on the calendar. You can implement a form
                    here to collect event details.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4 mr-1" />
                Filters
                {(statusFilter || typeFilter) && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    {(statusFilter ? 1 : 0) + (typeFilter ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Status</h4>
                  <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Event Type</h4>
                  <Select value={typeFilter || ""} onValueChange={(value) => setTypeFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  disabled={!statusFilter && !typeFilter && !searchTerm}
                >
                  Reset Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden md:flex items-center gap-1">
              {Object.entries(eventTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1 mr-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color.dark }} />
                  <span className="text-xs text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Event details dialog
  const EventDetailsDialog = () => {
    if (!selectedEvent) return null

    const type = getEventType(selectedEvent)
    const typeColor = eventTypeColors[type as keyof typeof eventTypeColors] || eventTypeColors.Other
    const statusColor = statusColors[selectedEvent.status as keyof typeof statusColors] || statusColors.Default

    return (
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogDescription>Event details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-sm font-medium">Date</div>
              <div className="col-span-3 text-sm">
                {format(selectedEvent.start, "MMMM d, yyyy")}
                {selectedEvent.allDay && " (All day)"}
              </div>
            </div>

            {!selectedEvent.allDay && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Time</div>
                <div className="col-span-3 text-sm">
                  {format(selectedEvent.start, "h:mm a")} - {format(selectedEvent.end, "h:mm a")}
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-sm font-medium">Status</div>
              <div className="col-span-3">
                <Badge
                  className="text-xs"
                  style={{
                    backgroundColor: statusColor.light,
                    color: statusColor.text,
                  }}
                >
                  {selectedEvent.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-sm font-medium">Type</div>
              <div className="col-span-3">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: typeColor.dark,
                    color: typeColor.dark,
                  }}
                >
                  {type}
                </Badge>
              </div>
            </div>

            {selectedEvent.priority && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Priority</div>
                <div className="col-span-3 text-sm">{selectedEvent.priority}</div>
              </div>
            )}

            {selectedEvent.description && (
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="text-sm font-medium">Description</div>
                <div className="col-span-3 text-sm">{selectedEvent.description}</div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={`/components/${selectedEvent.id.split("-")[0]}`}>View Component</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[200px]" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-[200px]" />
              <Skeleton className="h-9 w-[100px]" />
            </div>
            <Skeleton className="h-[500px] w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <style jsx global>{`
          .rbc-calendar {
            font-family: inherit;
          }
          
          .rbc-header {
            padding: 8px 0;
            font-weight: 500;
            font-size: 0.875rem;
          }
          
          .rbc-today {
            background-color: rgba(var(--primary), 0.1);
          }
          
          .rbc-event {
            border-radius: 4px;
            padding: 2px 5px;
            transition: all 0.2s ease;
          }
          
          .rbc-event:hover {
            opacity: 0.95;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .rbc-off-range-bg {
            background-color: rgba(0,0,0,0.03);
          }
          
          .rbc-toolbar button {
            color: inherit;
          }
          
          .rbc-toolbar button:active, .rbc-toolbar button.rbc-active {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
          }
          
          .rbc-month-view, .rbc-time-view {
            border-radius: 8px;
            border-color: hsl(var(--border));
          }
          
          .rbc-day-bg + .rbc-day-bg, 
          .rbc-header + .rbc-header,
          .rbc-time-content > * + * > * {
            border-color: hsl(var(--border));
          }
          
          .rbc-time-content, 
          .rbc-time-header-content {
            border-color: hsl(var(--border));
          }
          
          .rbc-agenda-view table.rbc-agenda-table {
            border-color: hsl(var(--border));
          }
          
          .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
            border-color: hsl(var(--border));
            padding: 8px;
          }
          
          .rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {
            padding-right: 16px;
          }
          
          .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
            border-color: hsl(var(--border));
            padding: 8px;
          }
        `}</style>

        <div className="h-[650px]">
          <CustomToolbar />
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100% - 100px)" }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            view={view as any}
            onView={(newView) => setView(newView)}
            date={date}
            onNavigate={() => {}}
            components={{
              toolbar: () => null, // We're using our custom toolbar
            }}
            popup
            selectable
            longPressThreshold={10}
          />
          <EventDetailsDialog />
        </div>
      </CardContent>
    </Card>
  )
}
