import { createClientForServer } from '@/utils/supabase/server'
import { signOut } from '@/utils/actions'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const supabase = await createClientForServer()

  const session = await supabase.auth.getUser()

  if (!session.data.user)
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <h1 className='text-4xl font-bold'>Not Authenticated</h1>
        <Link className='btn' href='/auth'>
          Sign in
        </Link>
      </div>
    )

  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session

  const { name, email, user_name, avatar_url } = user_metadata

  const userName = user_name ? `@${user_name}` : 'User Name Not Set'

  // console.log(session)

  return (
    <div className=''>
      {/* continer at the center of the page  */}
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        {avatar_url && (
          <Image
            src={avatar_url}
            alt={name}
            width={200}
            height={200}
            className='rounded-full'
            quality={100}
          />
        )}
        <h1 className='text-4xl font-bold'>{name}</h1>
        <p className='text-xl'>User Name: {userName}</p>
        <p className='text-xl'>Email: {email}</p>
        <p className='text-xl'>Created with: {app_metadata.provider}</p>

        <form action={signOut}>
          <button className='btn' type='submit'>
            Sign Out
          </button>
        </form>
      </div>
      <Link className='btn' href='/create'>
        Create Post
      </Link>
    </div>
  )
}
