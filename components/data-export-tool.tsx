"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileSpreadsheet, FileJson, Calendar } from "lucide-react"

export function DataExportTool() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [isExporting, setIsExporting] = useState(false)
  const [selectedData, setSelectedData] = useState({
    components: true,
    files: true,
    audio: true,
    team: true,
    analytics: false,
  })
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsExporting(false)

    toast({
      title: "Export Complete",
      description: `Your data has been exported in ${exportFormat.toUpperCase()} format.`,
    })
  }

  const handleDataSelection = (key: keyof typeof selectedData) => {
    setSelectedData({
      ...selectedData,
      [key]: !selectedData[key],
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Data to Export</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="components"
              checked={selectedData.components}
              onCheckedChange={() => handleDataSelection("components")}
            />
            <Label htmlFor="components">Components</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="files" checked={selectedData.files} onCheckedChange={() => handleDataSelection("files")} />
            <Label htmlFor="files">Files</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="audio" checked={selectedData.audio} onCheckedChange={() => handleDataSelection("audio")} />
            <Label htmlFor="audio">Audio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="team" checked={selectedData.team} onCheckedChange={() => handleDataSelection("team")} />
            <Label htmlFor="team">Team</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="analytics"
              checked={selectedData.analytics}
              onCheckedChange={() => handleDataSelection("analytics")}
            />
            <Label htmlFor="analytics">Analytics</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Export Format</h3>
        <RadioGroup defaultValue="csv" value={exportFormat} onValueChange={setExportFormat}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Label>
            </Card>
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer">
                <FileJson className="h-4 w-4" />
                <span>JSON</span>
              </Label>
            </Card>
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="excel" id="excel" />
              <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Excel</span>
              </Label>
            </Card>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Date Range</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="flex items-center space-x-2 p-4">
            <Checkbox id="all-time" defaultChecked />
            <Label htmlFor="all-time" className="flex items-center gap-2 cursor-pointer">
              <Calendar className="h-4 w-4" />
              <span>All Time</span>
            </Label>
          </Card>
          <Card className="flex items-center space-x-2 p-4">
            <Checkbox id="custom-range" />
            <Label htmlFor="custom-range" className="flex items-center gap-2 cursor-pointer">
              <Calendar className="h-4 w-4" />
              <span>Custom Range</span>
            </Label>
          </Card>
        </div>
      </div>

      <Button
        onClick={handleExport}
        disabled={isExporting || !Object.values(selectedData).some(Boolean)}
        className="w-full"
      >
        {isExporting ? (
          <>Exporting...</>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </>
        )}
      </Button>
    </div>
  )
}
