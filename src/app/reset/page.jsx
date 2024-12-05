'use client'
import { sendResetPasswordEmail } from '@/utils/actions'
import { useActionState } from 'react'

const Page = () => {
  const [state, formAction, isPending] = useActionState(
    sendResetPasswordEmail,
    {
      error: '',
      success: '',
    },
  )

  const { error, success } = state

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <form action={formAction} className='flex flex-col gap-2'>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Email</span>
          </div>
          <input
            type='email'
            name='email'
            className='input input-bordered w-full max-w-xs'
          />
        </label>

        <button type='submit' className='btn mt-2' disabled={isPending}>
          {isPending && <span className='loading loading-spinner'></span>}
          Reset Password
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
      </form>
    </div>
  )
}

export default Page
