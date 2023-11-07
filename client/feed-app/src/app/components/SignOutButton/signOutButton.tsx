"use client"

import { userApi } from '@/app/api/userApi'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function SignOutButton() {
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      userApi.getUser(session.user.email)
        .then((response) => {
          setUser(response?.data.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [session]);

  const handleSignout = async () => {
    if (user.user?.id) {
      await userApi.logout(user.user.id);
    }
    await signOut();
    router.push('/'); 
  }

  return (
    <button className='w-full bg-cyan-950 text-white h-full rounded-md' onClick={handleSignout}>Sign out</button>
  );
}

export default SignOutButton;
