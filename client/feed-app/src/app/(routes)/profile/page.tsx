import { getServerSession } from 'next-auth'
import React from 'react'
import yser from "@/app/user-flat.svg"
import Image from 'next/image'
import SignOutButton from '@/app/components/SignOutButton/signOutButton'


async function Profile() {
  const session = await getServerSession()

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>

      <div className='flex flex-row  border-2 p-10 rounded-md shadow-md  '>
        {session?.user?.image ? <div className='w-2/4 pr-20 '> <img alt="user image" className=' bg-cover' src={session?.user?.image}></img></div> :
          <div className='w-3/4'><Image src={yser} width={130} height={130} alt='user image' /></div>}
        <div className='w-fit'>
          <div className='pb-5'>Name: {session?.user?.name}</div>
          <div>Mail:  {session?.user?.email}</div>
        </div>

        <SignOutButton />

      </div>

    </div>
  )
}

export default Profile