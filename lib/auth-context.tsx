"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  createPasswordResetRequest,
  validatePasswordResetToken,
  clearPasswordResetRequest,
  getProfileImage,
} from "@/lib/storage"

// Add these imports at the top
import { generateVerificationCode, verifyCode, sendVerificationEmail } from "@/lib/email-service"

type User = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  provider?: "email" | "google"
  emailVerified?: boolean
}

// Update the AuthContextType interface to include verification methods
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  requestPasswordReset: (email: string) => Promise<boolean>
  resetPassword: (email: string, token: string, newPassword: string) => Promise<boolean>
  verifyEmail: (token: string) => Promise<boolean>
  updateProfileImage: (imageUrl: string | null) => void
  // Add these new methods
  sendVerificationCode: (email: string) => Promise<boolean>
  verifyEmailWithCode: (email: string, code: string) => Promise<boolean>
  isEmailVerified: (email: string) => boolean
  // Add notification methods
  getNotifications: () => Notification[]
  markNotificationAsRead: (id: string) => void
  hasUnreadNotifications: () => boolean
}

// Sample users for demo
const DEMO_USERS: User[] = [
  {
    id: "user-1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    provider: "email",
    emailVerified: true,
  },
  {
    id: "user-2",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=32&width=32",
    provider: "google",
    emailVerified: true,
  },
]

// Define notification type
export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

// Sample notifications
const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "New Component Added",
    message: "User Profile Card component has been added to the project.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Component Updated",
    message: "Navigation Menu component has been updated by John Smith.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    type: "info",
  },
  {
    id: "notif-3",
    title: "High Priority Task",
    message: "Statistics Widget needs review before tomorrow's deadline.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    type: "warning",
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Update the AuthProvider component to include the new methods
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)

      // Check if there's a profile image stored
      if (parsedUser.id) {
        const profileImage = getProfileImage(parsedUser.id)
        if (profileImage) {
          parsedUser.avatar = profileImage
        }
      }

      setUser(parsedUser)
    }

    // Load notifications from localStorage if available
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }

    setIsLoading(false)
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation (in a real app, this would be a server call)
    if (email === "jane.doe@example.com" && password === "password") {
      const foundUser = DEMO_USERS.find((u) => u.email === email) || DEMO_USERS[0]

      // Check if there's a profile image stored
      const profileImage = getProfileImage(foundUser.id)
      if (profileImage) {
        foundUser.avatar = profileImage
      }

      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)

    // Simulate Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would be handled by a provider like NextAuth.js
    const foundUser = DEMO_USERS.find((u) => u.provider === "google") || DEMO_USERS[1]

    // Check if there's a profile image stored
    const profileImage = getProfileImage(foundUser.id)
    if (profileImage) {
      foundUser.avatar = profileImage
    }

    setUser(foundUser)
    localStorage.setItem("user", JSON.stringify(foundUser))
    setIsLoading(false)
    return true
  }

  // Add these new methods
  const sendVerificationCode = async (email: string) => {
    // Check if email exists
    const userExists = DEMO_USERS.some((u) => u.email === email) || (user && user.email === email)
    if (!userExists) return false

    // Generate and send verification code
    const code = generateVerificationCode(email)
    sendVerificationEmail(email, code)

    return true
  }

  const verifyEmailWithCode = async (email: string, code: string) => {
    const isValid = verifyCode(email, code)

    if (isValid && user && user.email === email) {
      // Update the current user's email verification status
      const updatedUser = { ...user, emailVerified: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    return isValid
  }

  const isEmailVerified = (email: string) => {
    if (!user) return false
    return user.email === email && user.emailVerified === true
  }

  // Update the register method to send a verification code
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (DEMO_USERS.some((u) => u.email === email)) {
      setIsLoading(false)
      return false
    }

    // In a real app, this would create a new user in the database
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "User",
      provider: "email",
      emailVerified: false,
    }

    // Generate and send verification code
    const code = generateVerificationCode(email)
    sendVerificationEmail(email, code)

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const requestPasswordReset = async (email: string) => {
    // Check if email exists
    const userExists = DEMO_USERS.some((u) => u.email === email)
    if (!userExists) return false

    // Create password reset token
    const token = createPasswordResetRequest(email)

    // In a real app, this would send an email with the reset link
    console.log(`Password reset email sent to ${email} with token ${token}`)

    return true
  }

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    // Validate token
    const isValid = validatePasswordResetToken(email, token)
    if (!isValid) return false

    // In a real app, this would update the user's password in the database
    console.log(`Password reset for ${email} with new password`)

    // Clear the reset request
    clearPasswordResetRequest(email)

    return true
  }

  const verifyEmail = async (token: string) => {
    // In a real app, this would validate the token and mark the email as verified
    console.log(`Email verified with token ${token}`)

    // Update the current user if it matches
    if (user && !user.emailVerified) {
      const updatedUser = { ...user, emailVerified: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    return true
  }

  const updateProfileImage = (imageUrl: string | null) => {
    if (!user) return

    const updatedUser = { ...user, avatar: imageUrl || undefined }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Notification methods
  const getNotifications = () => {
    return notifications
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const hasUnreadNotifications = () => {
    return notifications.some((notification) => !notification.read)
  }

  // Update the return value to include the new methods
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        register,
        requestPasswordReset,
        resetPassword,
        verifyEmail,
        updateProfileImage,
        // Add these new methods
        sendVerificationCode,
        verifyEmailWithCode,
        isEmailVerified,
        // Add notification methods
        getNotifications,
        markNotificationAsRead,
        hasUnreadNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
