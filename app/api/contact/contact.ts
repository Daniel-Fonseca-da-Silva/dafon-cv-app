"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().optional(),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  const validatedFields = contactSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    }
  }

  try {
    // Simulate sending to Golang backend
    // const response = await fetch("YOUR_GOLANG_BACKEND_URL/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(validatedFields.data),
    // })

    // if (!response.ok) throw new Error("Failed to send message")
    
    // Simulate delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
