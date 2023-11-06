'use client'

import { userApi } from '@/app/api/userApi';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Header() {
  const [role, setRole] = useState("customer");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get('news');

  useEffect(() => {
    async function fetchUserRole() {
      if (session?.user?.email) {
        try {
          const moderator = await userApi.getUser(session.user.email);
          if (moderator?.data.data.role) {
            setRole(moderator.data.data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }

    fetchUserRole();
  }, [session?.user?.email]);
 
  return <><div className=' text-cyan-50 w-full h-14 flex items-center justify-between bg-cyan-900 p-3'>
    <Link href={'/'}><strong > NEWS CORE</strong></Link>
    <Link href={'/newsfeed'}> <div>   <button>News</button></div></Link>
    <div>
      {session ? (
        <div className="flex space-x-4">
          {role == "moderator" &&  <Link href={'/moderator'}>Moderator Dashboard</Link> }
          <button className="">Profile</button>
          <button onClick={() => signOut()}>Sign out</button>
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
