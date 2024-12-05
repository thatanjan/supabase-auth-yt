'use client'
import { updatePassword } from '@/utils/actions'
import { useActionState } from 'react'

const Page = () => {
  const [state, formAction, isPending] = useActionState(updatePassword, {
    error: '',
    success: '',
  })

  const { error, success } = state

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <form action={formAction}>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>New Password</span>
          </div>
          <input
            name='password'
            type='password'
            className='input input-bordered w-full max-w-xs'
          />
        </label>

        <button type='submit' className='btn mt-2' disabled={isPending}>
          {isPending && <span className='loading loading-spinner'></span>}
          Update Password
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
