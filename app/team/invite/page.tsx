"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Mail, Copy } from "lucide-react"
import { useState } from "react"

export default function InviteMembersPage() {
  const [inviteLink] = useState("https://trackerr.app/invite/abc123def456")

  return (
    <AuthGuard>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Invite Team Members</h1>
              <p className="text-muted-foreground">Add new members to your team and assign roles</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send Email Invitation
                </CardTitle>
                <CardDescription>Invite team members via email with a personalized message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="colleague@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="manager">Project Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Hi! I'd like to invite you to join our component tracking project..."
                    rows={3}
                  />
                </div>

                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Copy className="h-5 w-5" />
                  Share Invite Link
                </CardTitle>
                <CardDescription>Share this link with team members to join instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-link">Invite Link</Label>
                  <div className="flex gap-2">
                    <Input id="invite-link" value={inviteLink} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-role">Default Role for Link</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Viewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Link Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Link expires in 7 days</li>
                    <li>• Maximum 10 uses</li>
                    <li>• New members get Viewer role by default</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Generate New Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </AuthGuard>
  )
}
