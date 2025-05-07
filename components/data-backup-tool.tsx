"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Download, Upload, Clock, RefreshCw, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"

type Backup = {
  id: string
  date: Date
  size: string
  items: number
}

export function DataBackupTool() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null)
  const { toast } = useToast()

  // Mock backup data
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: "backup-1",
      date: new Date(2023, 4, 15, 9, 30),
      size: "2.4 MB",
      items: 156,
    },
    {
      id: "backup-2",
      date: new Date(2023, 4, 10, 14, 45),
      size: "2.1 MB",
      items: 142,
    },
    {
      id: "backup-3",
      date: new Date(2023, 4, 5, 11, 15),
      size: "1.9 MB",
      items: 128,
    },
  ])

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    setBackupProgress(0)

    // Simulate backup process with progress updates
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setBackupProgress((i / totalSteps) * 100)
    }

    // Add new backup to the list
    const newBackup: Backup = {
      id: `backup-${Date.now()}`,
      date: new Date(),
      size: "2.6 MB",
      items: 168,
    }

    setBackups([newBackup, ...backups])
    setIsCreatingBackup(false)
    setBackupProgress(0)

    toast({
      title: "Backup Created",
      description: "Your data has been successfully backed up.",
    })
  }

  const handleRestore = async (backupId: string) => {
    setSelectedBackup(backupId)
    setIsRestoring(true)
    setRestoreProgress(0)

    // Simulate restore process with progress updates
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setRestoreProgress((i / totalSteps) * 100)
    }

    setIsRestoring(false)
    setRestoreProgress(0)
    setSelectedBackup(null)

    toast({
      title: "Restore Complete",
      description: "Your data has been successfully restored from backup.",
    })
  }

  const handleDeleteBackup = (backupId: string) => {
    setBackups(backups.filter((backup) => backup.id !== backupId))

    toast({
      title: "Backup Deleted",
      description: "The selected backup has been deleted.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Create Backup</h3>
          <Button onClick={handleCreateBackup} disabled={isCreatingBackup} size="sm">
            {isCreatingBackup ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Create Backup
              </>
            )}
          </Button>
        </div>

        {isCreatingBackup && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Creating backup...</span>
              <span>{Math.round(backupProgress)}%</span>
            </div>
            <Progress value={backupProgress} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Backups</h3>
        {backups.length > 0 ? (
          <div className="space-y-4">
            {backups.map((backup) => (
              <Card key={backup.id} className={selectedBackup === backup.id ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{format(backup.date, "PPP")}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{format(backup.date, "p")}</span>
                          <span className="mx-2">•</span>
                          <span>{backup.size}</span>
                          <span className="mx-2">•</span>
                          <span>{backup.items} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBackup(backup.id)}
                        disabled={isRestoring && selectedBackup === backup.id}
                      >
                        Delete
                      </Button>
                      <Button size="sm" onClick={() => handleRestore(backup.id)} disabled={isRestoring}>
                        {isRestoring && selectedBackup === backup.id ? (
                          <>
                            <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                            Restoring...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-3 w-3" />
                            Restore
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {isRestoring && selectedBackup === backup.id && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Restoring from backup...</span>
                        <span>{Math.round(restoreProgress)}%</span>
                      </div>
                      <Progress value={restoreProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No backups available</p>
          </div>
        )}
      </div>
    </div>
  )
}
