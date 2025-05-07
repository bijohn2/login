"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ListChecks, Loader2, CheckCircle, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function VerifyEmailCodePage() {
  const { user, sendVerificationCode, verifyEmailWithCode, isEmailVerified } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    } else if (user?.email) {
      setEmail(user.email)
    }

    // Check if already verified
    if (user?.email && isEmailVerified(user.email)) {
      setIsVerified(true)
    }
  }, [searchParams, user, isEmailVerified])

  const handleVerify = async () => {
    if (!email) {
      setError("Email is required")
      return
    }

    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit verification code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await verifyEmailWithCode(email, code)

      if (success) {
        setIsVerified(true)
        toast({
          title: "Email verified",
          description: "Your email has been verified successfully.",
        })
      } else {
        setError("Invalid or expired verification code. Please try again.")
      }
    } catch (error) {
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      setError("Email is required")
      return
    }

    setIsSending(true)
    setError(null)

    try {
      const success = await sendVerificationCode(email)

      if (success) {
        toast({
          title: "Verification code sent",
          description: "A new verification code has been sent to your email.",
        })
      } else {
        setError("Failed to send verification code. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-md bg-primary p-2">
              <ListChecks className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{isVerified ? "Email Verified" : "Verify Your Email"}</CardTitle>
          <CardDescription className="text-center">
            {isVerified
              ? "Your email has been verified successfully"
              : "Enter the verification code sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-4 space-y-4">
          {isVerified ? (
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
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading || isSending}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">
                    Verification Code
                  </label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button onClick={handleVerify} disabled={isLoading || !code || code.length !== 6} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>

                  <Button variant="outline" onClick={handleResendCode} disabled={isSending} className="w-full">
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
