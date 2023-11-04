import React from 'react'
import GoogleButton from '../GoogleButton/googleButton'
import SignForm from '../SignForm/signForm'
import Link from 'next/link'

export default async function SigninComp() {
  return (
    <>
      <SignForm />
      <GoogleButton />

      <Link href={'/registration'}>or Registration</Link>

    </>
  )
}
