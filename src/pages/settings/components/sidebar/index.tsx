import { ButtonLib } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    title: 'My Profile',
    url: '/settings/profile'
  },
  {
    title: 'Custom Subjects',
    url: '/settings/subjects'
  },
  {
    title: 'Notifications',
    url: '/settings/notifications'
  }
]

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [itemChosen, setItemChosen] = useState('My Profile')
  const navigate = useNavigate()

  const handleItemClick = (title: string, url: string) => {
    setItemChosen(title)
    navigate(url)
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              type="button"
              className={cn(
                'p-2 text-sm font-medium hover:rounded-full',
                item.title === itemChosen && 'rounded-full bg-primary-vc-100'
              )}
              key={item.title}
              onClick={() => handleItemClick(item.title, item.url)}
            >
              <span
                className={cn(
                  item.title === itemChosen && 'text-primary-vc-500'
                )}
              >
                {item.title}
              </span>
            </button>
          ))}

          <ButtonLib
            className="text-destructive hover:bg-transparent"
            variant="ghost"
          >
            <span className="text-destructive">Delete Account</span>
          </ButtonLib>
        </div>
        <Separator className="h-[81vh]" orientation="vertical" />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  )
}
