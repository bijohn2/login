import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AudioUploadForm } from "@/components/audio-upload-form"
import { AuthGuard } from "@/components/auth-guard"

export default function AudioUploadPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Upload Audio" text="Add new audio files to your library." />
        <AudioUploadForm />
      </DashboardShell>
    </AuthGuard>
  )
}
