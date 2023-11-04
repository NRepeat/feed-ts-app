import React from 'react'
import GoogleButton from '../GoogleButton/googleButton'
import RegistrationForm from '../RegestrationForm/registrationForm'
import SignForm from '../SignForm/signForm'
import Link from 'next/link'

export default async function SigninComp() {
  return (
    <>
      <GoogleButton />
      <SignForm />
      <Link href={'/Registration'}>or registration</Link>

    </>
  )
}
