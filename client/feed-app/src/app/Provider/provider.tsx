'use client'

import {SessionProvider} from "next-auth/react"

export const ProviderSession =  ({children}:{children:React.ReactNode})=>{
  return ( <SessionProvider>{children}</SessionProvider>)
}