'use server'

import { createClientForServer } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const signInWith = provider => async () => {
  const supabase = await createClientForServer()

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })

  if (error) {
    console.log(error)
  }

  redirect(data.url)
}

const signinWithGoogle = signInWith('google')
const signinWithGithub = signInWith('github')

const signOut = async () => {
  const supabase = await createClientForServer()
  await supabase.auth.signOut()
}

const signupWithEmailPassword = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error) {
    console.log('error', error)
    return {
      success: null,
      error: error.message,
    }
  }

  return {
    success: 'Please check your email',
    error: null,
  }
}

const signinWithEmailPassword = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error) {
    console.log('error', error)
    return {
      success: null,
      error: error.message,
    }
  }

  redirect('/')
}

const sendResetPasswordEmail = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    formData.get('email'),
  )

  if (error) {
    console.log('error', error)

    return {
      success: '',
      error: error.message,
    }
  }

  return {
    success: 'Please check your email',
    error: '',
  }
}

const updatePassword = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.updateUser({
    password: formData.get('password'),
  })

  if (error) {
    console.log('error', error)

    return {
      success: '',
      error: error.message,
    }
  }

  return {
    success: 'Password updated',
    error: '',
  }
}

const signinWithMagicLink = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.get('email'),
  })

  if (error) {
    console.log('error', error)

    return {
      success: null,
      error: error.message,
    }
  }

  return {
    success: 'Please check your email',
    error: null,
  }
}

const signinWithOtp = async (prev, formData) => {
  const supabase = await createClientForServer()

  const email = formData.get('email')

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  })

  if (error) {
    console.log('error', error)

    return {
      success: null,
      error: error.message,
    }
  }

  redirect(`/verify-otp?email=${email}`)
}

const verifyOtp = async (prev, formData) => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.verifyOtp({
    token: formData.get('token'),
    email: prev.email,
    type: 'email',
  })

  if (error) {
    console.log('error', error)

    return {
      success: null,
      error: error.message,
    }
  }

  redirect('/')
}

export {
  signinWithGoogle,
  signOut,
  signupWithEmailPassword,
  signinWithGithub,
  signinWithEmailPassword,
  sendResetPasswordEmail,
  updatePassword,
  signinWithMagicLink,
  signinWithOtp,
  verifyOtp,
}
