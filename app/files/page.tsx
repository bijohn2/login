import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FilesManager } from "@/components/files-manager"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

export default function FilesPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="flex items-center justify-between">
          <DashboardHeader
            heading="Files & Attachments"
            text="Manage all files and attachments across your components."
          />
          <Link href="/files/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading files...</div>}>
          <FilesManager />
        </Suspense>
      </DashboardShell>
    </AuthGuard>
  )
}
