import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Database, FileText, Plug, Sparkles, Table } from "lucide-react"

export const metadata: Metadata = {
  title: "Integrations | Project Component Tracker",
  description: "Manage your integrations with external services",
}

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect your project with external services to enhance functionality
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Supabase Integration */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-emerald-100 p-2 dark:bg-emerald-900">
                <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle>Supabase</CardTitle>
            </div>
            <CardDescription>
              Connect to Supabase for database storage, authentication, and real-time updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Replace local storage with a robust database solution for persistent data across devices and users.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/integrations/supabase">Configure</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Vercel Blob Integration */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-blue-100 p-2 dark:bg-blue-900">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Vercel Blob</CardTitle>
            </div>
            <CardDescription>Enhance file and audio storage with CDN-backed storage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Improve performance and reliability of file storage with global CDN distribution and secure access.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/integrations/blob">Configure</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Google Sheets Integration */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-green-100 p-2 dark:bg-green-900">
                <Table className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Google Sheets</CardTitle>
            </div>
            <CardDescription>Connect with Google Sheets for data import and export</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Easily export component data to Google Sheets or import existing data from spreadsheets.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/integrations/google-sheets">Configure</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* AI Integration */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-purple-100 p-2 dark:bg-purple-900">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>AI Assistant</CardTitle>
            </div>
            <CardDescription>Add AI capabilities for component analysis and suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use AI to analyze components, suggest improvements, and generate documentation automatically.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/integrations/ai">Configure</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* API Integration */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-orange-100 p-2 dark:bg-orange-900">
                <Plug className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>API Access</CardTitle>
            </div>
            <CardDescription>Configure API access for external integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate API keys and configure access for third-party tools and services.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/integrations/api">Configure</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
