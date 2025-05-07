"use client"

import { useState, useEffect } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent } from "@/components/ui/card"
import { getAllComponents } from "@/lib/data"
import { toast } from "@/components/ui/use-toast"

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
}

export function ComponentCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
          })

          // Add review event
          componentEvents.push({
            id: `${component.id}-review`,
            title: `${component.name} Review`,
            start: reviewDate,
            end: reviewDate,
            allDay: true,
            status: component.status,
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
            })
          }
        })

        setEvents(componentEvents)
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

  // Custom event styling based on component status
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3182ce" // Default blue

    switch (event.status) {
      case "Complete":
      case "Completed":
        backgroundColor = "#38a169" // Green
        break
      case "In Design":
        backgroundColor = "#805ad5" // Purple
        break
      case "Under Review":
      case "In Review":
        backgroundColor = "#dd6b20" // Orange
        break
      case "In Development":
      case "In Progress":
        backgroundColor = "#3182ce" // Blue
        break
      case "Not Started":
        backgroundColor = "#e53e3e" // Red
        break
      default:
        backgroundColor = "#718096" // Gray
    }

    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0",
      display: "block",
    }

    return {
      style,
    }
  }

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    toast({
      title: event.title,
      description: `Date: ${format(event.start, "PPP")}`,
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[600px] flex items-center justify-center">
            <p>Loading calendar...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            views={["month", "week", "day", "agenda"]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
