import { userApi } from "../../api/userApi"

export default async function Home() {
 const a = await userApi.createUser()
  return (
    <></>
  )
}
