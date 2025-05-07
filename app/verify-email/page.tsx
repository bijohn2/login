"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks, Loader2, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function VerifyEmailPage() {
  const { verifyEmail } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const token = searchParams.get("token") || ""

  useEffect(() => {
    async function verify() {
      if (!token) {
        setError("Invalid verification link. Please request a new one.")
        setIsLoading(false)
        return
      }

      try {
        const success = await verifyEmail(token)
        setIsVerified(success)
        if (!success) {
          setError("Invalid or expired verification link. Please request a new one.")
        }
      } catch (error) {
        setError("An error occurred during verification. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [token, verifyEmail])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-md bg-primary p-2">
              <ListChecks className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {isLoading
              ? "Verifying your email address..."
              : isVerified
                ? "Your email has been verified successfully"
                : "Email verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-4 space-y-4">
          {isLoading ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : isVerified ? (
            <>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Thank you for verifying your email address. You can now access all features of the platform.
              </p>
              <Button onClick={() => router.push("/")} className="mt-4">
                Go to dashboard
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {error || "Email verification failed. Please try again."}
              </p>
              <Button onClick={() => router.push("/login")} className="mt-4">
                Go to login
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
