import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FileUploadForm } from "@/components/file-upload-form"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function FileUploadPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link href="/files">
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Files
              </Button>
            </Link>
          </div>
          <DashboardHeader heading="Upload Files" text="Upload files and attachments to your components." />
          <FileUploadForm />
        </div>
      </DashboardShell>
    </AuthGuard>
  )
}
