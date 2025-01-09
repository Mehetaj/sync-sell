'use server'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type useActionState = {
  error?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
  success?: boolean
}

export async function submitContact(prevState: useActionState | null, formData: FormData): Promise<useActionState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Here you would typically send the data to your backend
  return { success: true }
}
