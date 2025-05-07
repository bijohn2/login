"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Mail, MoreHorizontal, UserPlus, Edit, Trash2, Send } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample team members data
const teamMembers = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    components: ["User Profile Card", "Feedback Form"],
  },
  {
    id: "2",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    components: ["Navigation Menu"],
  },
  {
    id: "3",
    name: "Lisa Wong",
    email: "lisa.wong@example.com",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    components: ["Statistics Widget"],
  },
  {
    id: "4",
    name: "Alex Kumar",
    email: "alex.kumar@example.com",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    components: [],
  },
]

// Sample customers data
const customers = [
  {
    id: "c1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    role: "Enterprise Client",
    avatar: "/placeholder.svg?height=40&width=40",
    projects: ["Website Redesign"],
  },
  {
    id: "c2",
    name: "TechStart Inc.",
    email: "info@techstart.com",
    role: "Startup Client",
    avatar: "/placeholder.svg?height=40&width=40",
    projects: ["Mobile App"],
  },
  {
    id: "c3",
    name: "Global Services Ltd.",
    email: "support@globalservices.com",
    role: "Corporate Client",
    avatar: "/placeholder.svg?height=40&width=40",
    projects: ["Dashboard Portal"],
  },
]

export function TeamMembers() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("team")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  const handleEdit = (member: any) => {
    setSelectedMember(member)
    setIsEditDialogOpen(true)
  }

  const handleEmail = (member: any) => {
    setSelectedMember(member)
    setIsEmailDialogOpen(true)
  }

  const handleDelete = (member: any) => {
    toast({
      title: "Member deleted",
      description: `${member.name} has been removed from the team.`,
    })
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    toast({
      title: "Member updated",
      description: `${selectedMember.name}'s information has been updated.`,
    })
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send an email via an API
    console.log("Sending email to:", selectedMember.email)
    console.log("Subject:", emailSubject)
    console.log("Message:", emailMessage)

    // Simulate sending email to the selected member
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: selectedMember.email,
        subject: emailSubject,
        message: emailMessage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send email")
        }
        return response.json()
      })
      .catch((error) => {
        console.error("Error sending email:", error)
      })

    setIsEmailDialogOpen(false)
    setEmailSubject("")
    setEmailMessage("")

    toast({
      title: "Email sent",
      description: `Your email has been sent to ${selectedMember.name} at ${selectedMember.email}.`,
    })
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    toast({
      title: activeTab === "team" ? "Team member added" : "Customer added",
      description: `A new ${activeTab === "team" ? "team member" : "customer"} has been added.`,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add {activeTab === "team" ? "Team Member" : "Customer"}
          </Button>
        </div>

        <TabsContent value="team" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(member)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEmail(member)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(member)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Assigned Components</h4>
                    {member.components.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {member.components.map((component) => (
                          <li key={component} className="text-sm">
                            {component}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">No components assigned</p>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEmail(member)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/team/member/${member.id}`)}>
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.role}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(customer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEmail(customer)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(customer)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Projects</h4>
                    {customer.projects.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {customer.projects.map((project) => (
                          <li key={project} className="text-sm">
                            {project}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">No projects assigned</p>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEmail(customer)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/customers/${customer.id}`)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Member/Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {activeTab === "team" ? "Team Member" : "Customer"}</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new {activeTab === "team" ? "team member" : "customer"}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddMember}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder={activeTab === "team" ? "John Doe" : "Acme Inc."} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={activeTab === "team" ? "john.doe@example.com" : "contact@acme.com"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder={activeTab === "team" ? "Frontend Developer" : "Enterprise Client"} />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add {activeTab === "team" ? "Member" : "Customer"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {activeTab === "team" ? "Team Member" : "Customer"}</DialogTitle>
            <DialogDescription>Update the details for {selectedMember?.name}.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" defaultValue={selectedMember?.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedMember?.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input id="edit-role" defaultValue={selectedMember?.role} />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {selectedMember?.name}</DialogTitle>
            <DialogDescription>Compose an email to send to {selectedMember?.email}.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendEmail}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  placeholder="Enter email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email-message">Message</Label>
                <textarea
                  id="email-message"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message here..."
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
