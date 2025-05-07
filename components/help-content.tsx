"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Search, BookOpen, Users, Layers, BarChart2, Send, CheckCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("getting-started")
  const [supportSubmitted, setSupportSubmitted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Showing results for "${searchQuery}"`,
    })
  }

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSupportSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSupportSubmitted(false)
    }, 5000)

    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search help articles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <Button type="submit" onClick={handleSearch} disabled={!searchQuery}>
          Search
        </Button>
      </div>

      <Tabs defaultValue="getting-started" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="team-collaborations">Team Collaborations</TabsTrigger>
          <TabsTrigger value="component-management">Component Management</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="support">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Getting Started Guide
              </CardTitle>
              <CardDescription>Learn the basics of using the Component Tracker application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="welcome">
                  <AccordionTrigger>Welcome to Component Tracker</AccordionTrigger>
                  <AccordionContent>
                    Component Tracker helps you manage and track all the components in your project. This guide will
                    help you get started with the application.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="creating-component">
                  <AccordionTrigger>Creating Your First Component</AccordionTrigger>
                  <AccordionContent>
                    To create your first component, click on the "Components" link in the sidebar, then click the "Add
                    Component" button. Fill in the details and click "Create Component".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="managing-team">
                  <AccordionTrigger>Managing Your Team</AccordionTrigger>
                  <AccordionContent>
                    Go to the "Team" page to add team members and assign them to components. You can also manage their
                    roles and permissions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tracking-progress">
                  <AccordionTrigger>Tracking Progress</AccordionTrigger>
                  <AccordionContent>
                    Use the Dashboard to get an overview of your project's progress. You can see statistics on component
                    status, priority, and more.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="using-calendar">
                  <AccordionTrigger>Using the Calendar</AccordionTrigger>
                  <AccordionContent>
                    The Calendar page helps you track deadlines and milestones for your components. You can view events
                    by day, week, or month.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <Button variant="outline" onClick={() => window.open("/docs/getting-started.pdf", "_blank")}>
                  Download Full Guide (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-collaborations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Team Collaborations
              </CardTitle>
              <CardDescription>Learn how to collaborate effectively with your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="working-together">
                  <AccordionTrigger>Working Together Effectively</AccordionTrigger>
                  <AccordionContent>
                    Component Tracker provides several features to help your team collaborate effectively.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="assigning-components">
                  <AccordionTrigger>Assigning Components</AccordionTrigger>
                  <AccordionContent>
                    Assign components to team members to clarify responsibilities. You can do this when creating a
                    component or by editing an existing one.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="commenting">
                  <AccordionTrigger>Commenting and Feedback</AccordionTrigger>
                  <AccordionContent>
                    Use the comments section on each component to provide feedback and discuss changes. @mention team
                    members to notify them.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="notifications">
                  <AccordionTrigger>Notifications</AccordionTrigger>
                  <AccordionContent>
                    Stay updated with notifications about component changes, comments, and deadlines. Configure your
                    notification preferences in Settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sharing-files">
                  <AccordionTrigger>Sharing Files</AccordionTrigger>
                  <AccordionContent>
                    Upload and share files related to components. This helps keep all relevant information in one place.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <Button variant="outline" onClick={() => window.open("/docs/team-collaboration.pdf", "_blank")}>
                  Download Collaboration Guide (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="component-management" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="mr-2 h-5 w-5" />
                Component Management
              </CardTitle>
              <CardDescription>Learn advanced techniques for managing components.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced-management">
                  <AccordionTrigger>Advanced Component Management</AccordionTrigger>
                  <AccordionContent>
                    Get the most out of Component Tracker with these advanced management techniques.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="component-statuses">
                  <AccordionTrigger>Component Statuses</AccordionTrigger>
                  <AccordionContent>
                    Use statuses (In Design, Under Review, In Development, Testing, Complete) to track the progress of
                    each component through its lifecycle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="priority-levels">
                  <AccordionTrigger>Priority Levels</AccordionTrigger>
                  <AccordionContent>
                    Set priorities (High, Medium, Low) to help your team focus on the most important components first.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="component-dependencies">
                  <AccordionTrigger>Component Dependencies</AccordionTrigger>
                  <AccordionContent>
                    Link related components to track dependencies. This helps ensure that components are developed in
                    the correct order.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="version-history">
                  <AccordionTrigger>Version History</AccordionTrigger>
                  <AccordionContent>
                    View and restore previous versions of components. This is useful for tracking changes and reverting
                    if necessary.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <Button variant="outline" onClick={() => window.open("/docs/component-management.pdf", "_blank")}>
                  Download Management Guide (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Reporting and Analytics
              </CardTitle>
              <CardDescription>Learn how to use the reporting and analytics features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="reporting-analytics">
                  <AccordionTrigger>Reporting and Analytics</AccordionTrigger>
                  <AccordionContent>
                    Component Tracker provides powerful reporting and analytics features to help you track progress and
                    make informed decisions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dashboard-overview">
                  <AccordionTrigger>Dashboard Overview</AccordionTrigger>
                  <AccordionContent>
                    The Dashboard provides a high-level overview of your project's status, including component counts,
                    progress percentages, and priority distribution.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="custom-reports">
                  <AccordionTrigger>Custom Reports</AccordionTrigger>
                  <AccordionContent>
                    Create custom reports to analyze specific aspects of your project. Filter by status, priority,
                    assignee, and more.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="export-options">
                  <AccordionTrigger>Export Options</AccordionTrigger>
                  <AccordionContent>
                    Export reports in various formats (CSV, PDF, Excel) for sharing with stakeholders or further
                    analysis.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trend-analysis">
                  <AccordionTrigger>Trend Analysis</AccordionTrigger>
                  <AccordionContent>
                    View trends over time to track progress and identify potential issues early. This helps you make
                    proactive adjustments to your project plan.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <Button variant="outline" onClick={() => window.open("/docs/reporting-analytics.pdf", "_blank")}>
                  Download Reporting Guide (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Need help? Contact our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              {supportSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">Support Request Submitted</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Thank you for contacting support. We've received your request and will respond to your email within
                    24 hours.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    A confirmation email has been sent to your registered email address.
                  </p>
                  <Button className="mt-6" variant="outline" onClick={() => setSupportSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Subject of your inquiry" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail"
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">
                      Attachments (Optional)
                    </label>
                    <Input id="file" type="file" multiple />
                    <p className="text-xs text-muted-foreground">
                      You can attach screenshots or files to help us understand your issue better.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Support Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
