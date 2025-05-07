"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Download } from "lucide-react"

interface FileDownloadButtonProps extends ButtonProps {
  fileUrl: string
  fileName: string
  icon?: boolean
}

export function FileDownloadButton({ fileUrl, fileName, icon = true, children, ...props }: FileDownloadButtonProps) {
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleDownload} {...props}>
      {icon && <Download className="mr-2 h-4 w-4" />}
      {children || "Download"}
    </Button>
  )
}
