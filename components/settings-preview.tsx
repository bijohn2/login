"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Globe, Eye, EyeOff, Shield, Bell, Palette, Check, X } from "lucide-react"

interface SettingsPreviewProps {
  formData: {
    name: string
    email: string
    role: string
    bio: string
    phone: string
    location: string
    website: string
    avatar: string
    profileVisibility: string
    showEmail: boolean
    showLocation: boolean
    emailNotifications: boolean
    pushNotifications: boolean
    securityAlerts: boolean
    marketingEmails: boolean
    weeklyDigest: boolean
    theme: string
    compactMode: boolean
    language: string
    timezone: string
    analyticsOptOut: boolean
  }
}

export function SettingsPreview({ formData }: SettingsPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Preview
          </CardTitle>
          <CardDescription>This is how your profile appears to others based on your privacy settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar || "/placeholder.svg?height=80&width=80"} alt={formData.name} />
              <AvatarFallback className="text-lg">
                {formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{formData.name || "Your Name"}</h2>
                <Badge variant="secondary" className="text-xs">
                  {formData.profileVisibility}
                </Badge>
              </div>
              <p className="text-muted-foreground">{formData.role || "Your Role"}</p>
              {formData.bio && <p className="text-sm">{formData.bio}</p>}
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {formData.showEmail ? (
                  <span>{formData.email || "your@email.com"}</span>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </span>
                )}
              </div>
              {formData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {formData.showLocation && formData.location ? (
                  <span>{formData.location}</span>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </span>
                )}
              </div>
              {formData.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-blue-600 hover:underline">{formData.website}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Summary
          </CardTitle>
          <CardDescription>Overview of your privacy and visibility settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <Badge variant="outline">{formData.profileVisibility}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Visible</span>
                {formData.showEmail ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Location Visible</span>
                {formData.showLocation ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Analytics Opt-out</span>
                {formData.analyticsOptOut ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Summary
          </CardTitle>
          <CardDescription>Your current notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                {formData.emailNotifications ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                {formData.pushNotifications ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Alerts</span>
                {formData.securityAlerts ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly Digest</span>
                {formData.weeklyDigest ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Marketing Emails</span>
                {formData.marketingEmails ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance Summary
          </CardTitle>
          <CardDescription>Your current appearance and localization settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <Badge variant="outline">{formData.theme}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compact Mode</span>
                {formData.compactMode ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <Badge variant="outline">{formData.language.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Timezone</span>
                <Badge variant="outline">{formData.timezone}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
