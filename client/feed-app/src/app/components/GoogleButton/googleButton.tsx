"use client"
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function GoogleButton() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || '/'
  return (
   <button onClick={()=>(signIn("google",{callbackUrl}))}>Sign in with Google</button>
  )
}

export default GoogleButton