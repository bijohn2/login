// This simulates an email service in the browser
// In a real application, this would connect to an actual email service like SendGrid, Mailgun, etc.

interface EmailVerificationCode {
  email: string
  code: string
  expires: Date
  attempts: number
}

// Store verification codes in memory (would be in a database in a real app)
const verificationCodes: Map<string, EmailVerificationCode> = new Map()

export function generateVerificationCode(email: string): string {
  // Generate a 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  // Store the code with expiration (30 minutes)
  const expires = new Date()
  expires.setMinutes(expires.getMinutes() + 30)

  verificationCodes.set(email, {
    email,
    code,
    expires,
    attempts: 0,
  })

  // In a real app, this would send an actual email
  console.log(`[EMAIL SERVICE] Verification code for ${email}: ${code}`)

  return code
}

export function verifyCode(email: string, code: string): boolean {
  const verification = verificationCodes.get(email)

  if (!verification) {
    return false
  }

  // Check if code is expired
  if (new Date() > verification.expires) {
    verificationCodes.delete(email)
    return false
  }

  // Increment attempts
  verification.attempts += 1

  // Check if too many attempts (max 5)
  if (verification.attempts > 5) {
    verificationCodes.delete(email)
    return false
  }

  // Check if code matches
  if (verification.code !== code) {
    return false
  }

  // Code is valid, remove it
  verificationCodes.delete(email)
  return true
}

export function sendPasswordResetEmail(email: string, resetLink: string): void {
  // In a real app, this would send an actual email
  console.log(`[EMAIL SERVICE] Password reset link for ${email}: ${resetLink}`)
}

export function sendWelcomeEmail(email: string, name: string): void {
  // In a real app, this would send an actual email
  console.log(`[EMAIL SERVICE] Welcome email sent to ${email} for ${name}`)
}

export function sendVerificationEmail(email: string, code: string): void {
  // In a real app, this would send an actual email
  console.log(`[EMAIL SERVICE] Verification code sent to ${email}: ${code}`)
}
