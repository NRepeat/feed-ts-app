import ModeratorDashBoard from '@/app/components/ModeratoDashBoard/moderatorDashBoard'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { autchConfig } from "../../../../config/auth"
import { userApi } from '@/app/api/userApi'
import { postApi } from '@/app/api/postApi'

async function ModeratoPage() {

  const session: any = await getServerSession(autchConfig)
  const moderator: any = await userApi.getUser(session?.user.email)
  console.log("🚀 ~ file: page.tsx:13 ~ ModeratoPage ~ moderator:", moderator.data)
  let role = ""
  moderator?.data.data.user.role ? role = moderator?.data.data.user.role : role = "customer"
  if (role === "moderator") {
    const posts = await postApi.getAllPosts().then((posts) => {
      return posts.data.data.sort((a: Post, b: Post) => {
        const dateA = new Date(a.pubDate).getTime();
        const dateB = new Date(b.pubDate).getTime();
        return dateB - dateA;
      })
    })
    return (
      <div className='min-h-screen'>
        <ModeratorDashBoard role={role} posts={posts} />
      </div>
    )

  } else
    return <>Error</>

}


export default ModeratoPage
