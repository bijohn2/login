"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getSupportRequests, updateSupportRequest } from "@/app/actions/support"
import { AuthGuard } from "@/components/auth-guard"
import type { SupportMessage } from "@/lib/storage"

export default function SupportAdminPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getSupportRequests()
        setMessages(data)
      } catch (error) {
        console.error("Error loading support messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  async function handleStatusChange(id: string, status: "new" | "in-progress" | "resolved") {
    try {
      const updatedMessage = await updateSupportRequest(id, status)
      if (updatedMessage) {
        setMessages(messages.map((msg) => (msg.id === id ? updatedMessage : msg)))
      }
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const newMessages = messages.filter((msg) => msg.status === "new")
  const inProgressMessages = messages.filter((msg) => msg.status === "in-progress")
  const resolvedMessages = messages.filter((msg) => msg.status === "resolved")

  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Support Requests" text="Manage and respond to customer support requests." />

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="new">
              New <span className="ml-1 rounded-full bg-red-100 px-2 text-xs text-red-800">{newMessages.length}</span>
            </TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <SupportMessagesList
              messages={messages}
              isLoading={isLoading}
              onStatusChange={handleStatusChange}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="new">
            <SupportMessagesList
              messages={newMessages}
              isLoading={isLoading}
              onStatusChange={handleStatusChange}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="in-progress">
            <SupportMessagesList
              messages={inProgressMessages}
              isLoading={isLoading}
              onStatusChange={handleStatusChange}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="resolved">
            <SupportMessagesList
              messages={resolvedMessages}
              isLoading={isLoading}
              onStatusChange={handleStatusChange}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </AuthGuard>
  )
}

interface SupportMessagesListProps {
  messages: SupportMessage[]
  isLoading: boolean
  onStatusChange: (id: string, status: "new" | "in-progress" | "resolved") => void
  getStatusBadge: (status: string) => React.ReactNode
}

function SupportMessagesList({ messages, isLoading, onStatusChange, getStatusBadge }: SupportMessagesListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Loading support requests...</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <p>No support requests found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{message.subject}</CardTitle>
                <CardDescription>
                  From: {message.name} ({message.email}) • {new Date(message.createdAt).toLocaleString()}
                </CardDescription>
              </div>
              <div>{getStatusBadge(message.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap mb-4">{message.message}</p>
            <div className="flex gap-2 justify-end">
              {message.status !== "in-progress" && (
                <Button variant="outline" size="sm" onClick={() => onStatusChange(message.id, "in-progress")}>
                  Mark In Progress
                </Button>
              )}
              {message.status !== "resolved" && (
                <Button variant="default" size="sm" onClick={() => onStatusChange(message.id, "resolved")}>
                  Mark Resolved
                </Button>
              )}
              {message.status === "resolved" && (
                <Button variant="outline" size="sm" onClick={() => onStatusChange(message.id, "new")}>
                  Reopen
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
