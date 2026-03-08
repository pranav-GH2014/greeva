'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // 1. Basic validation
  if (password !== confirmPassword) {
    redirect('/signup?error=Passwords do not match')
  }

  // 2. Call Supabase to create the user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is where users go after clicking the email confirmation link
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.message)
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  // 3. Success! Redirect to a "check your email" page or login
  redirect('/login?message=Check your email to confirm your account')
}