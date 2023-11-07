"use client"

import { userApi } from '@/app/api/userApi'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import { userSelector } from '@/app/selector/selector'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function SignOutButton() {
  const router = useRouter();
  const { user } = useAppSelector(userSelector)


  const handleSignout = async () => {
    if (user !== undefined) {
      await userApi.logout(user.id);
      await signOut();
      router.push('/signin');
    } else {
      await signOut();
      router.push('/signin');
    }

  }

  return (
    <button className='w-full bg-cyan-950 text-white h-full rounded-md' onClick={handleSignout}>Sign out</button>
  );
}

export default SignOutButton;
