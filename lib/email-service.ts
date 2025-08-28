// Simple in-memory storage for verification codes (in production, use a database)
interface EmailVerificationCode {
  email: string
  code: string
  expiresAt: Date
}

const verificationCodes: EmailVerificationCode[] = []

export function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function sendVerificationEmail(email: string): string {
  const code = generateVerificationCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  // Remove any existing codes for this email
  const index = verificationCodes.findIndex((vc) => vc.email === email)
  if (index !== -1) {
    verificationCodes.splice(index, 1)
  }

  // Add new code
  verificationCodes.push({ email, code, expiresAt })

  // In a real app, you'd send an actual email here
  console.log(`Verification code for ${email}: ${code}`)

  return code
}

export function verifyEmailCode(email: string, code: string): boolean {
  const verification = verificationCodes.find(
    (vc) => vc.email === email && vc.code === code && vc.expiresAt > new Date(),
  )

  if (verification) {
    // Remove the used code
    const index = verificationCodes.indexOf(verification)
    verificationCodes.splice(index, 1)
    return true
  }

  return false
}

export function sendPasswordResetEmail(email: string): string {
  // Generate a reset token (in a real app, this would be a secure token)
  const token = Math.random().toString(36).substring(2, 15)

  // In a real app, you'd send an actual email with a reset link
  console.log(`Password reset link for ${email}: /reset-password?token=${token}`)

  return token
}
