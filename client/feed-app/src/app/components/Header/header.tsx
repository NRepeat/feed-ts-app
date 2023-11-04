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
  if (role === "moderator" && search) {
    return (

      <><div className='w-full bg-cyan-900'>Header</div></>
    );
  }
  return <><div className=' text-cyan-50 w-full h-14 flex items-center justify-between bg-cyan-900 p-3'>
    <Link href={'/'}><strong > Feed core</strong></Link>
    <Link href={'/feed'}> <div>   <button>News</button></div></Link>
    <div>
      {session ? (
        <div className="flex space-x-4">
          {role === "moderator" && search ? <Link href={'/moderator'}>Moderator Dashboard</Link> : <button className="">Profile</button>}

          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <Link href={'/signin'}>
            <button className="">Sign In</button>
        </Link>
    
      )}
    </div>
  </div></>
}

export default Header
