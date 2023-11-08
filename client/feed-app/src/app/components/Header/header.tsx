'use client'

import { userApi } from '@/app/api/userApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import { getUser } from '@/app/redux/slices/userSlice';
import { userSelector } from '@/app/selector/selector';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react'

function Header() {
  const expire = new Date()
  const status = false
  expire.setDate(expire.getDate() + 1);
  const expireString = expire.toISOString().split('T')[0];
  const { data: session } = useSession();
  const { user } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  useEffect(() => {
    async function fetchUserRole() {
      if (session?.user?.email) {
        try {
          await dispatch(getUser({ email: session.user.email }));
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }

    fetchUserRole();
  }, [session?.user?.email, dispatch]);
  const handleSignout = async () => {

    if (user?.id) {
      signOut()
    }
    await userApi.logout(user?.id)
    await userApi.setStatus(status, user?.id, expireString)
    signOut()


  }
  return <><div className=' text-cyan-50 w-full sm:h-14 h-20 flex items-center justify-evenly sm:justify-between bg-cyan-900 p-3'>
    <div className='flex justify-between w-full flex-col sm:flex-row'>  <Link href={'/'}><strong > NEWS CORE</strong></Link>
      <Link href={'/newsfeed'}> <div className='sm:ml-15'>   <button>News</button></div></Link></div>

    <div className='flex justify-end  w-full flex-row '>
      {session ? (
        <div className="flex space-x-4">
          {user?.role === "moderator" ? <Link href={'/moderator'}>Moderator Dashboard</Link> : <></>}
          <Link href={'/profile'}>Profile</Link>

          <button onClick={() => handleSignout()}>Sign out</button>
        </div>
      ) : (
        <div className='flex gap-3'>
          <Link href={'/signin'}>
            <button className="">Sign In</button>
          </Link>
          <Link href={'/registration'}>
            <button className="">Sign up</button>
          </Link></div>

      )}
    </div>
  </div></>
}

export default Header
