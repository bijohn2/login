"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { PageLoading } from "@/components/page-loading"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <PageLoading />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
