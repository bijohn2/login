// This simulates a database in the browser for demo purposes
// In a real application, this would be replaced with actual database calls

// Type definitions for our storage
export interface SupportMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "in-progress" | "resolved"
  createdAt: string
}

export interface PasswordResetRequest {
  email: string
  token: string
  expires: string
}

// Initialize storage if it doesn't exist
function initializeStorage() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("supportMessages")) {
    localStorage.setItem("supportMessages", JSON.stringify([]))
  }

  if (!localStorage.getItem("passwordResetRequests")) {
    localStorage.setItem("passwordResetRequests", JSON.stringify([]))
  }

  if (!localStorage.getItem("profileImages")) {
    localStorage.setItem("profileImages", JSON.stringify({}))
  }
}

// Support messages storage
export function saveSupportMessage(message: Omit<SupportMessage, "id" | "status" | "createdAt">): SupportMessage {
  initializeStorage()

  const newMessage: SupportMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  }

  const messages = getSupportMessages()
  messages.push(newMessage)
  localStorage.setItem("supportMessages", JSON.stringify(messages))

  return newMessage
}

export function getSupportMessages(): SupportMessage[] {
  initializeStorage()
  return JSON.parse(localStorage.getItem("supportMessages") || "[]")
}

export function updateSupportMessage(id: string, updates: Partial<SupportMessage>): SupportMessage | null {
  const messages = getSupportMessages()
  const index = messages.findIndex((msg) => msg.id === id)

  if (index === -1) return null

  const updatedMessage = { ...messages[index], ...updates }
  messages[index] = updatedMessage
  localStorage.setItem("supportMessages", JSON.stringify(messages))

  return updatedMessage
}

// Password reset functionality
export function createPasswordResetRequest(email: string): string {
  initializeStorage()

  // Generate a random token
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Set expiration to 1 hour from now
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  const request: PasswordResetRequest = { email, token, expires }

  const requests = JSON.parse(localStorage.getItem("passwordResetRequests") || "[]")
  // Remove any existing requests for this email
  const filteredRequests = requests.filter((req: PasswordResetRequest) => req.email !== email)
  filteredRequests.push(request)
  localStorage.setItem("passwordResetRequests", JSON.stringify(filteredRequests))

  return token
}

export function validatePasswordResetToken(email: string, token: string): boolean {
  initializeStorage()

  const requests = JSON.parse(localStorage.getItem("passwordResetRequests") || "[]") as PasswordResetRequest[]
  const request = requests.find((req) => req.email === email && req.token === token)

  if (!request) return false

  // Check if token is expired
  if (new Date(request.expires) < new Date()) return false

  return true
}

export function clearPasswordResetRequest(email: string): void {
  initializeStorage()

  const requests = JSON.parse(localStorage.getItem("passwordResetRequests") || "[]") as PasswordResetRequest[]
  const filteredRequests = requests.filter((req) => req.email !== email)
  localStorage.setItem("passwordResetRequests", JSON.stringify(filteredRequests))
}

export function getProfileImage(userId: string): string | null {
  initializeStorage()
  const profileImages = JSON.parse(localStorage.getItem("profileImages") || "{}")
  return profileImages[userId]?.url || null
}
