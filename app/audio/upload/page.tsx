import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AudioUploadForm } from "@/components/audio-upload-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Upload Audio | Project Component Tracker",
  description: "Add new audio files to your library.",
}

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
