"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileSpreadsheet, FileJson, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DataImportTool() {
  const [importFormat, setImportFormat] = useState("csv")
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importOptions, setImportOptions] = useState({
    overwriteExisting: false,
    validateBeforeImport: true,
    importRelationships: true,
  })
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setIsImporting(true)
    setImportProgress(0)

    // Simulate import process with progress updates
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setImportProgress((i / totalSteps) * 100)
    }

    setIsImporting(false)
    setImportProgress(0)
    setSelectedFile(null)

    toast({
      title: "Import Complete",
      description: "Your data has been successfully imported.",
    })
  }

  const handleOptionChange = (key: keyof typeof importOptions) => {
    setImportOptions({
      ...importOptions,
      [key]: !importOptions[key],
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Import Format</h3>
        <RadioGroup defaultValue="csv" value={importFormat} onValueChange={setImportFormat}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="csv" id="import-csv" />
              <Label htmlFor="import-csv" className="flex items-center gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Label>
            </Card>
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="json" id="import-json" />
              <Label htmlFor="import-json" className="flex items-center gap-2 cursor-pointer">
                <FileJson className="h-4 w-4" />
                <span>JSON</span>
              </Label>
            </Card>
            <Card className="flex items-center space-x-2 p-4">
              <RadioGroupItem value="excel" id="import-excel" />
              <Label htmlFor="import-excel" className="flex items-center gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Excel</span>
              </Label>
            </Card>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload File</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">{importFormat.toUpperCase()} file (max 10MB)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept={importFormat === "csv" ? ".csv" : importFormat === "json" ? ".json" : ".xlsx,.xls"}
                onChange={handleFileChange}
                disabled={isImporting}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="text-sm text-center">
              Selected file: <span className="font-medium">{selectedFile.name}</span> (
              {(selectedFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Import Options</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="overwrite"
              checked={importOptions.overwriteExisting}
              onCheckedChange={() => handleOptionChange("overwriteExisting")}
            />
            <Label htmlFor="overwrite">Overwrite existing data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="validate"
              checked={importOptions.validateBeforeImport}
              onCheckedChange={() => handleOptionChange("validateBeforeImport")}
            />
            <Label htmlFor="validate">Validate data before import</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="relationships"
              checked={importOptions.importRelationships}
              onCheckedChange={() => handleOptionChange("importRelationships")}
            />
            <Label htmlFor="relationships">Import relationships between data</Label>
          </div>
        </div>
      </div>

      {importOptions.overwriteExisting && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Overwriting existing data will permanently replace your current data. This action cannot be undone.
          </AlertDescription>
        </Alert>
      )}

      {isImporting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Importing data...</span>
            <span>{Math.round(importProgress)}%</span>
          </div>
          <Progress value={importProgress} />
        </div>
      )}

      <Button onClick={handleImport} disabled={isImporting || !selectedFile} className="w-full">
        {isImporting ? (
          <>Importing...</>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </>
        )}
      </Button>
    </div>
  )
}
