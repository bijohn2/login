import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataExportTool } from "@/components/data-export-tool"
import { DataImportTool } from "@/components/data-import-tool"
import { DataBackupTool } from "@/components/data-backup-tool"
import { TutorialTrigger } from "@/components/tutorial-trigger"

export const metadata: Metadata = {
  title: "Data Management | Project Component Tracker",
  description: "Export, import, and manage your project data",
}

export default function DataManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
          <p className="text-muted-foreground mt-2">Export, import, and manage your project data</p>
        </div>
        <TutorialTrigger tutorialId="data-management" />
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Export your project data in various formats for use in other applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataExportTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Data</CardTitle>
              <CardDescription>Import data from external sources into your project</CardDescription>
            </CardHeader>
            <CardContent>
              <DataImportTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Create backups of your project data and restore when needed</CardDescription>
            </CardHeader>
            <CardContent>
              <DataBackupTool />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
