'use client'

import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useConvex, useMutation } from 'convex/react'
import { useEffect } from 'react'
import FileList from './_components/FileList'
import Header from './_components/Header'

function Dashboard() {
  const convex = useConvex()
  const {user}:any = useKindeBrowserClient()
  // const getUser = useQuery(api.user.getUser,{email:user?.email});
  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
    if(user) {
      checkUser()
    }
  }, [user])

  const checkUser = async ()=>{
    const result = await convex.query(api.user.getUser,{email:user?.email})
    if(!result.length){
      createUser({
        name:user.given_name,
        email:user.email,
        image:user.picture
      }).then((res)=>console.log(res))
    }
  }
  
  return (
    <div className='p-8'>
      <Header/>
      <FileList/>
    </div>
  )
}

export default Dashboard  