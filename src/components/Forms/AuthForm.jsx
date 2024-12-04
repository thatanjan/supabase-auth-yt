'use client'
import { signinWithGoogle } from '@/utils/actions'
import React from 'react'

const AuthForm = () => {
  return (
    <form className='flex flex-col gap-2'>
      <button className='btn' formAction={signinWithGoogle}>
        Sign in with Google
      </button>
    </form>
  )
}

export default AuthForm
