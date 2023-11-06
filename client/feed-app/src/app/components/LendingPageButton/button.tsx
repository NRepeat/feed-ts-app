"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

function Button() {
  const { data: session } = useSession();
  return (
    <div> {!session && <Link href={'/signin'} className="signButton w-3/12 p-3 rounded-md"> Sign in</Link> }   </div>
  )
}

export default Button