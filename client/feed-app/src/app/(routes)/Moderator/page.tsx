import ModeratorDashBoard from '@/app/components/ModeratoDashBoard/moderatorDashBoard'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { autchConfig } from "../../../../config/auth"
import { userApi } from '@/app/api/userApi'
interface UserSesion {
  user: {
    email: string
    name: string
  }
}
async function ModeratoPage() {
  const session:any = await getServerSession(autchConfig)
  
  const moderator:any = await userApi.getUser(session?.user.email)
  if(moderator?.data.data.role === "moderator"){
    return (
      <>
        <ModeratorDashBoard />
      </>
    )

  }else
  return<>Error</>

}


export default ModeratoPage
