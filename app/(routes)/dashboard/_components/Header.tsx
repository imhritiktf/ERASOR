import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  const {user}:any = useKindeBrowserClient()
  return (
    <div className='flex justify-end w-full items-center  gap-2'>
      <div className='flex gap-2 border rounded-md p-1 items-center'>
        <Search className='h-4 w-4'/>
        <input type="text" placeholder='Search' />
      </div>
      <div>
        <Image src={user?user.picture:"https://avatars.githubusercontent.com/u/124599?v=4"} height={30} width={30} alt='user' className='rounded-full'/>
      </div>
      <Button className='gap-2 flex h-8 bg-blue-600 hover:bg-blue-700 text-sm'> <Send className='h-4 w-4'/> Invite</Button>
    </div>
  )
}

export default Header