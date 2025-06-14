import { IconBell } from '@tabler/icons-react'
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
          <h1 className="text-2xl font-semibold">Good morning, Ranie!</h1>
          <p>Long time no see</p>
        </div>
        <div className="flex items-center gap-4">
          <Input removeStyle placeholder="Search" />
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
