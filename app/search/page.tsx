"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileIcon, Users, Calendar, ListChecks } from "lucide-react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)

  const mockResults = {
    components: [
      { id: 1, name: "Button Component", description: "Primary action button", status: "completed" },
      { id: 2, name: "Modal Component", description: "Dialog modal overlay", status: "in-progress" },
      { id: 3, name: "Card Component", description: "Content card layout", status: "completed" },
    ],
    files: [
      { id: 1, name: "design-tokens.json", type: "JSON", size: "2.4 KB", modified: "2 hours ago" },
      { id: 2, name: "component-specs.pdf", type: "PDF", size: "1.2 MB", modified: "1 day ago" },
      { id: 3, name: "wireframes.fig", type: "Figma", size: "5.8 MB", modified: "3 days ago" },
    ],
    team: [
      { id: 1, name: "Sarah Chen", role: "Lead Designer", email: "sarah@company.com" },
      { id: 2, name: "Mike Johnson", role: "Frontend Developer", email: "mike@company.com" },
      { id: 3, name: "Emma Wilson", role: "UX Designer", email: "emma@company.com" },
    ],
    projects: [
      { id: 1, name: "Design System", progress: 75, status: "active" },
      { id: 2, name: "Mobile App", progress: 45, status: "in-progress" },
      { id: 3, name: "Marketing Site", progress: 100, status: "completed" },
    ],
  }

  const filteredResults = {
    components: mockResults.components.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    files: mockResults.files.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    team: mockResults.team.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    projects: mockResults.projects.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  }

  const totalResults = Object.values(filteredResults).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components, files, team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Button>Search</Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">
            {totalResults} results found for "{searchQuery || query}"
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
          <TabsTrigger value="components">Components ({filteredResults.components.length})</TabsTrigger>
          <TabsTrigger value="files">Files ({filteredResults.files.length})</TabsTrigger>
          <TabsTrigger value="team">Team ({filteredResults.team.length})</TabsTrigger>
          <TabsTrigger value="projects">Projects ({filteredResults.projects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Components */}
          {filteredResults.components.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  Components
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredResults.components.map((component) => (
                  <div key={component.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div>
                      <p className="font-medium">{component.name}</p>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </div>
                    <Badge variant={component.status === "completed" ? "default" : "secondary"}>
                      {component.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Files */}
          {filteredResults.files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5" />
                  Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredResults.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • {file.modified}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{file.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Team */}
          {filteredResults.team.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredResults.team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {filteredResults.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredResults.projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.progress}% complete</p>
                    </div>
                    <Badge
                      variant={
                        project.status === "completed"
                          ? "default"
                          : project.status === "active"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Search results for components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredResults.components.map((component) => (
                <div key={component.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                  <Badge variant={component.status === "completed" ? "default" : "secondary"}>{component.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>Search results for files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredResults.files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.modified}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{file.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Search results for team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredResults.team.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <Badge variant="outline">{member.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Search results for projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredResults.projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.progress}% complete</p>
                  </div>
                  <Badge
                    variant={
                      project.status === "completed" ? "default" : project.status === "active" ? "secondary" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SearchPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResults />
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
