import { IconSearch } from '@tabler/icons-react'
import { getHours } from 'date-fns'
import { useEffect, useState } from 'react'
import Input from '../input'
import { Notification } from '../notification'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TLoginUserRes } from '@/services/auth/usePostLogin'

const Header = () => {
  const [dataInfo, setDataInfo] = useState<TLoginUserRes['user']>({
    id: '',
    email: '',
    phone: '',
    createdAt: '',
    updatedAt: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: '',
    isActive: false,
    supabaseUserId: ''
  })

  const getGreeting = () => {
    const currentHour = getHours(new Date())

    if (currentHour < 12) {
      return 'morning'
    } else if (currentHour < 18) {
      return 'afternoon'
    } else {
      return 'evening'
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('userInfo')
    if (storedData) {
      setDataInfo(JSON.parse(storedData))
    }
  }, [])

  return (
    <div className="header">
      <div className="mb-5 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Good {getGreeting()}, {dataInfo.firstName} {dataInfo.lastName}!
          </h1>
          <p>Welcome back</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IconSearch className="absolute right-2.5 top-6 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input removeStyle placeholder="Search" />
          </div>
          <Notification />
          <Avatar>
            <AvatarImage
              src={`https://i.pravatar.cc/150?img=${dataInfo.firstName}`}
              alt="avatar"
            />
            <AvatarFallback>{dataInfo.firstName[0]}</AvatarFallback>
          </Avatar> 
        </div>
      </div>
    </div>
  )
}

export default Header
