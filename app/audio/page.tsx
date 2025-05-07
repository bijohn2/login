import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AudioPlayer } from "@/components/audio-player"

// Sample audio data - in a real app, this would come from an API or database
const audioFiles = [
  {
    id: "1",
    title: "Project Overview",
    description: "A brief overview of the project goals and timeline",
    url: "/audio/project-overview.mp3",
    duration: "2:45",
    date: "2023-03-15",
  },
  {
    id: "2",
    title: "Design Review",
    description: "Feedback on the latest design iterations",
    url: "/audio/design-review.mp3",
    duration: "5:12",
    date: "2023-03-20",
  },
  {
    id: "3",
    title: "Client Meeting",
    description: "Notes from the client meeting discussing requirements",
    url: "/audio/client-meeting.mp3",
    duration: "10:30",
    date: "2023-03-25",
  },
]

export default function AudioPage() {
  // Ensure audioFiles is an array
  const safeAudioFiles = Array.isArray(audioFiles) ? audioFiles : []

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Audio Notes</h1>
        <p className="text-muted-foreground">Listen to recorded notes and meetings related to your components.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Recordings</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Audio Recordings</CardTitle>
              <CardDescription>Listen to all recorded audio files.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                {safeAudioFiles.length > 0 ? (
                  safeAudioFiles.map((audio) => (
                    <AudioPlayer
                      key={audio.id}
                      title={audio.title}
                      description={audio.description}
                      url={audio.url}
                      duration={audio.duration}
                      date={audio.date}
                    />
                  ))
                ) : (
                  <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No audio recordings available</p>
                  </div>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Recordings</CardTitle>
              <CardDescription>Listen to recorded meetings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                {safeAudioFiles
                  .filter((audio) => audio.title.toLowerCase().includes("meeting"))
                  .map((audio) => (
                    <AudioPlayer
                      key={audio.id}
                      title={audio.title}
                      description={audio.description}
                      url={audio.url}
                      duration={audio.duration}
                      date={audio.date}
                    />
                  ))}
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Note Recordings</CardTitle>
              <CardDescription>Listen to recorded notes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                {safeAudioFiles
                  .filter((audio) => !audio.title.toLowerCase().includes("meeting"))
                  .map((audio) => (
                    <AudioPlayer
                      key={audio.id}
                      title={audio.title}
                      description={audio.description}
                      url={audio.url}
                      duration={audio.duration}
                      date={audio.date}
                    />
                  ))}
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
