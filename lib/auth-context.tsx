"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: "admin" | "user" | "developer"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual authentication API call
      // For now, allowing developer access with any credentials for development

      // Developer access - replace this with your authentication logic
      if (email && password) {
        // Determine user role based on email domain or specific emails
        let role: "admin" | "user" | "developer" = "user"

        if (email.includes("admin") || email === "admin@trackerr.com") {
          role = "admin"
        } else if (email.includes("dev") || email === "dev@trackerr.com") {
          role = "developer"
        }

        const userData = {
          id: Date.now().toString(),
          email: email,
          name: email
            .split("@")[0]
            .replace(".", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          avatar: "/placeholder.svg?height=32&width=32",
          role: role,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const isAdmin = () => {
    return user?.role === "admin" || user?.role === "developer"
  }

  return <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
