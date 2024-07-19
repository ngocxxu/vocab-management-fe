import { cn } from '@/lib/utils'
import {
  IconBooks,
  IconLayoutDashboard,
  IconMedal2,
  IconMessages
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { link: '/dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  {
    link: '/vocab',
    label: 'Vocabulary List',
    icon: IconBooks
    // links: [
    //   { link: '/docs', label: 'Documentation' },
    //   { link: '/resources', label: 'Resources' },
    //   { link: '/community', label: 'Community' },
    //   { link: '/blog', label: 'Blog' },
    // ],
  },
  { link: '/vocab-trainer', label: 'Vocab Trainer', icon: IconMedal2 },
  // { link: "/history", label: "History", icon: IconHistory },
  { link: '/ai-chat', label: 'ChatGPT', icon: IconMessages }
]

export function HeaderMenu() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const transformedPath = pathname.split('/').slice(0, 2).join('/')

  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        onClick={(event) => {
          event.preventDefault()
          navigate(`${link.link}`)
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <link.icon className="mb-1" size={18} />
          <p
            className={cn('pb-1', {
              'border-b-2': transformedPath === link.link
            })}
          >
            {link.label}
          </p>
        </div>
      </a>
    )
  })

  return (
    <div className="flex">
      <div className="invisible flex items-center justify-start gap-8 sm:visible">
        {items}
      </div>
    </div>
  )
}
