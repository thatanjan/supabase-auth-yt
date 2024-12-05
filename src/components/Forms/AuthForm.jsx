'use client'
import {
  signinWithEmailPassword,
  signinWithGithub,
  signinWithGoogle,
  signupWithEmailPassword,
} from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useActionState } from 'react'

const AuthForm = () => {
  const searchParams = useSearchParams()
  const authType = searchParams.get('authtype')?.toLowerCase()

  const getFormAction = () => {
    switch (authType) {
      case 'signup':
        return signupWithEmailPassword

      default:
        return signinWithEmailPassword
    }
  }

  const [state, formAction, isPending] = useActionState(getFormAction(), {
    error: '',
    success: '',
  })

  const renderSubmitButtonText = () => {
    switch (authType) {
      case 'signup':
        return 'Sign up'

      default:
        return 'Sign in'
    }
  }

  const { error, success } = state

  return (
    <form action={formAction} className='flex flex-col gap-2'>
      <label className='input input-bordered flex items-center gap-2'>
        <input type='email' className='grow' placeholder='Email' name='email' />
      </label>

      <label className='input input-bordered flex items-center gap-2'>
        <input
          type='password'
          className='grow'
          placeholder='Password'
          name='password'
        />
      </label>

      {authType === 'signup' ? (
        <Link className='link' href='/auth'>
          Already have an account?
        </Link>
      ) : (
        <div className='flex justify-between'>
          <Link className='link' href='/auth?authtype=signup'>
            Sign Up
          </Link>

          <Link className='link' href='/reset'>
            Forgot password?
          </Link>
        </div>
      )}

      <button type='submit' className='btn' disabled={isPending}>
        {isPending && <span className='loading loading-spinner'></span>}
        {renderSubmitButtonText()}
      </button>

      {error && (
        <div role='alert' className='alert alert-error'>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role='alert' className='alert alert-info'>
          <span>{success}</span>
        </div>
      )}

      <p className='text-center '>OR</p>

      <button className='btn' formAction={signinWithGoogle}>
        Sign in with Google
      </button>
      <button className='btn' formAction={signinWithGithub}>
        Sign in with Github
      </button>
    </form>
  )
}

export default AuthForm
