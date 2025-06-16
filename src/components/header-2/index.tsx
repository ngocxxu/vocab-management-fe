import { IconBell, IconSearch } from '@tabler/icons-react'
import { getHours } from 'date-fns'
import { useEffect, useState } from 'react'
import DropDownCustom from '../dropdown'
import Input from '../input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const list = [
  {
    body: 'Item 1'
  },
  {
    body: 'Item 2'
  }
]

const Header = () => {
  const [dataInfo, setDataInfo] = useState({ name: '', email: '' })

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
            Good {getGreeting()}, {dataInfo.name}!
          </h1>
          <p>Long time no see</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IconSearch className="absolute right-2.5 top-6 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input removeStyle placeholder="Search" />
          </div>
          <DropDownCustom
            align="end"
            side="bottom"
            label="Announcement"
            head={<IconBell />}
            list={list}
          />
          <Avatar>
            <AvatarImage
              src="https://avatar.iran.liara.run/public/92"
              alt="avatar"
            />
            <AvatarFallback>{dataInfo.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Header
