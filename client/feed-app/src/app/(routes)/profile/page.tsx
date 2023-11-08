
import { getServerSession } from 'next-auth'
import React from 'react'
import yser from "@/app/user-flat.svg"
import Image from 'next/image'
import SignOutButton from '@/app/components/SignOutButton/signOutButton'


async function Profile() {
  const session = await getServerSession()

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>

      <div className='flex  flex-col justify-center items-center lg:w-2/5  sm:flex-row border-2 p-10 rounded-md shadow-md  '>
        <div className='flex sm:justify-between justify-center w-full '>    {session?.user?.image ? <div className=''> <Image alt="user image" width={130} height={130} className=' bg-cover' src={session?.user?.image}></Image></div> :
          <div className=''><Image src={yser} width={130} height={130} alt='user image' /></div>}</div>

        <div className=' w-full flex h-full flex-col sm:items-start items-center justify-center'>
          <div className='pb-5'>Name: {session?.user?.name}</div>
          <div>Mail:  {session?.user?.email}</div>
        </div>

      </div>
      <div className='pt-5  w-1/3 sm:w-2/12  h-16'>
        <SignOutButton />

      </div>
    </div>
  )
}

export default Profile