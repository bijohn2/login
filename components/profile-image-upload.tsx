"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Camera, Loader2, X } from "lucide-react"
import { uploadProfileImage } from "@/lib/file-storage"
import { useAuth } from "@/lib/auth-context"

interface ProfileImageUploadProps {
  onUpload?: (imageUrl: string) => void
}

export function ProfileImageUpload({ onUpload }: ProfileImageUploadProps) {
  const { user, updateProfileImage } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB",
          variant: "destructive",
        })
        return
      }

      setIsUploading(true)

      try {
        const imageUrl = await uploadProfileImage(user.id, file)

        // Update the user's profile image in the auth context
        if (updateProfileImage) {
          updateProfileImage(imageUrl)
        }

        if (onUpload) {
          onUpload(imageUrl)
        }

        toast({
          title: "Profile image updated",
          description: "Your profile image has been updated successfully.",
        })
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your profile image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!user.avatar) return

    setIsUploading(true)

    try {
      // In a real app, this would call an API to remove the image
      // For this demo, we'll just update the user's profile
      if (updateProfileImage) {
        updateProfileImage(null)
      }

      if (onUpload) {
        onUpload("")
      }

      toast({
        title: "Profile image removed",
        description: "Your profile image has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error removing your profile image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar || "/placeholder.svg?height=96&width=96"} alt={user.name} />
          <AvatarFallback className="text-2xl">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Photo
        </Button>

        {user.avatar && (
          <Button type="button" variant="outline" size="sm" onClick={handleRemoveImage} disabled={isUploading}>
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
