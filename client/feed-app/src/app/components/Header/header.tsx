'use client'

import { userApi } from '@/app/api/userApi';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Header() {
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserRole() {
      if (session?.user?.email) {
        try {
          const user = await userApi.getUser(session.user.email);
          if (user?.data) {
            setUser(user.data.data);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }

    fetchUserRole();
  }, [session?.user?.email]);
  const handleSignout = async (userID: number) => {

    await userApi.logout(userID)
    signOut()


  }
  return <><div className=' text-cyan-50 w-full h-14 flex items-center justify-between bg-cyan-900 p-3'>
    <Link href={'/'}><strong > NEWS CORE</strong></Link>
    <Link href={'/newsfeed'}> <div>   <button>News</button></div></Link>
    <div>
      {session ? (
        <div className="flex space-x-4">
          {user.role === "moderator" && <Link href={'/moderator'}>Moderator Dashboard</Link>}
          <Link href={'/profile'}>Profile</Link>
       
          <button onClick={() => handleSignout( user.user.id)}>Sign out</button>
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
