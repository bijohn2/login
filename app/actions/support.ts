"use server"

import { saveSupportMessage, getSupportMessages, updateSupportMessage } from "@/lib/storage"

export async function submitSupportRequest(formData: FormData) {
  // Validate the form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required" }
  }

  try {
    // Save the message
    const savedMessage = saveSupportMessage({
      name,
      email,
      subject,
      message,
    })

    // In a real application, you would also:
    // 1. Send an email notification to support staff
    // 2. Send a confirmation email to the user
    // 3. Store the message in a database

    // Simulate sending an email
    console.log(`Support request received from ${name} (${email}): ${subject}`)

    return {
      success: true,
      message: "Your support request has been submitted. We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting support request:", error)
    return {
      success: false,
      error: "There was an error submitting your request. Please try again.",
    }
  }
}

export async function getSupportRequests() {
  // In a real application, this would fetch from a database
  // and would include authentication/authorization checks
  return getSupportMessages()
}

export async function updateSupportRequest(id: string, status: "new" | "in-progress" | "resolved") {
  // In a real application, this would update the database
  // and would include authentication/authorization checks
  return updateSupportMessage(id, { status })
}
