'use client'
import { verifyOtp } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

const Page = () => {
  const searchParams = useSearchParams()

  const email = searchParams.get('email') || ''

  const [state, formAction, isPending] = useActionState(verifyOtp, {
    error: '',
    email,
  })

  const { error } = state

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-4xl font-bold'>Verify OTP</h1>

      <form action={formAction}>
        <label className='input input-bordered flex items-center gap-2'>
          <input type='number' class='grow' placeholder='OTP' name='token' />
        </label>

        <button className='btn' type='submit' disabled={isPending}>
          {isPending && <span className='loading loading-spinner'></span>}
          Verify OTP
        </button>

        {error && (
          <div role='alert' className='alert alert-error'>
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  )
}

export default Page
