// Simple in-memory storage for demo purposes
// In a real app, you'd use a database

interface PasswordResetToken {
  email: string
  token: string
  expiresAt: Date
}

interface ProfileImage {
  userId: string
  imageUrl: string
  uploadedAt: Date
}

// In-memory storage
const passwordResetTokens: PasswordResetToken[] = []
const profileImages: ProfileImage[] = []

export function storePasswordResetToken(email: string, token: string): void {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  // Remove any existing tokens for this email
  const index = passwordResetTokens.findIndex((prt) => prt.email === email)
  if (index !== -1) {
    passwordResetTokens.splice(index, 1)
  }

  passwordResetTokens.push({ email, token, expiresAt })
}

export function validatePasswordResetToken(token: string): string | null {
  const resetToken = passwordResetTokens.find((prt) => prt.token === token && prt.expiresAt > new Date())

  return resetToken ? resetToken.email : null
}

export function removePasswordResetToken(token: string): void {
  const index = passwordResetTokens.findIndex((prt) => prt.token === token)
  if (index !== -1) {
    passwordResetTokens.splice(index, 1)
  }
}

export function storeProfileImage(userId: string, imageUrl: string): void {
  // Remove any existing image for this user
  const index = profileImages.findIndex((pi) => pi.userId === userId)
  if (index !== -1) {
    profileImages.splice(index, 1)
  }

  profileImages.push({
    userId,
    imageUrl,
    uploadedAt: new Date(),
  })
}

export function getProfileImage(userId: string): string | null {
  const image = profileImages.find((pi) => pi.userId === userId)
  return image ? image.imageUrl : null
}
