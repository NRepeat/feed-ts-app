"use client"

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function SignOutButton() {
  const route = useRouter()

  const handleLogout = async () => {
  // Дождитесь завершения выхода
    route.push("/signin");
    await signOut(); // Затем перейдите на новую страницу
  }
  return (
    <button onClick={() => handleLogout()}>Sign out</button>

  )
}

export default SignOutButton