'use client'

import { createBrowserClient } from '@supabase/ssr'

const createClientForBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

export default createClientForBrowser
