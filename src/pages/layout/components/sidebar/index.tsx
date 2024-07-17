import IconBook from '@/assets/svg/IconBook'
import IconBurger from '@/assets/svg/IconBurger'
import IconChatGPT from '@/assets/svg/IconChatGPT'
import IconExam from '@/assets/svg/IconExam'
import IconGlobal from '@/assets/svg/IconGlobal'
import IconHome from '@/assets/svg/IconHome'
import IconLogo from '@/assets/svg/IconLogo'
import IconPhone from '@/assets/svg/IconPhone'
import IconSetting from '@/assets/svg/IconSetting'
import { cn } from '@/lib/utils'
import { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'

const menuList = [
  {
    title: 'MENU',
    list: [
      {
        icon: IconHome,
        label: 'Dashboard',
        link: '/'
      },
      {
        icon: IconBook,
        label: 'Vocab List',
        link: '/vocab'
      },
      {
        icon: IconExam,
        label: 'Vocab Trainer',
        link: '/vocab-trainer'
      },
      {
        icon: IconChatGPT,
        label: 'Chatting with AI',
        link: '/chat-gpt'
      },
      {
        icon: IconGlobal,
        label: 'Community',
        link: '/community'
      }
    ]
  },
  {
    title: 'SUPPORT',
    list: [
      {
        icon: IconSetting,
        label: 'Settings',
        link: '/settings'
      },
      {
        icon: IconPhone,
        label: 'Help & Support',
        link: '/help-support'
      }
    ]
  }
]

type TIcon = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  isActive: boolean
}

const Icon = ({ icon: IconComponent, isActive }: TIcon) => (
  <IconComponent
    fill={cn(isActive ? 'var(--vc-primary-500)' : 'var(--vc-gray-600)')}
  />
)

export const Sidebar = () => {
  return (
    <div className="w-vertical-menu md:w-vertical-menu-md sm:w-vertical-menu-sm flex-none rounded-xl border px-4 py-6 font-medium shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <IconLogo />
          <div className="cursor-pointer">
            <IconBurger />
          </div>
        </div>

        {menuList.map(({ list, title }) => (
          <div className="flex flex-col gap-2.5" key={title}>
            <p className="text-gray-vc-400">{title}</p>
            <div className="flex flex-col gap-2.5">
              {list.map(({ icon, label, link }) => (
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
                      isActive ?
                        'text-primary-vc-500 bg-gradient-to-r from-blue-50 to-white font-bold'
                      : 'text-gray-vc-600 hover:bg-gray-vc-100'
                    }`
                  }
                  key={label}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="bg-primary-vc-500 absolute bottom-0 left-0 top-0 w-1 rounded-r-lg" />
                      )}
                      <Icon icon={icon} isActive={isActive} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
