import IconBurger from '@/assets/svg/IconBurger'
import IconLogo from '@/assets/svg/IconLogo'
import IconLogout from '@/assets/svg/IconLogout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { usePostLogout } from '@/services/auth/usePostLogout'
import { Breakpoint } from '@/utils/enum'
import { ComponentType, SVGProps, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useWindowSize } from 'react-use'
import { menuList } from '../../constants'

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
  const [isCollapseMenu, setCollapseMenu] = useState(false)
  const [dataInfo, setDataInfo] = useState({ name: '', email: '' })
  const { width } = useWindowSize()
  const { mutate } = usePostLogout()

  useEffect(() => {
    if (width < Breakpoint.XL) {
      setCollapseMenu(true)
    } else {
      setCollapseMenu(false)
    }
  }, [width])

  useEffect(() => {
    const storedData = localStorage.getItem('userInfo')
    if (storedData) {
      setDataInfo(JSON.parse(storedData))
    }
  }, [])

  return (
    <div
      className={cn(
        'flex-none rounded-xl border bg-white px-4 py-6 font-medium shadow-md transition-all duration-500 ease-in-out',
        isCollapseMenu ? 'w-vertical-menu-sm' : 'w-vertical-menu'
      )}
    >
      <div
        className={cn(
          'flex h-full flex-col gap-6',
          isCollapseMenu && 'items-center'
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapseMenu && <IconLogo />}
          <div
            className={cn('cursor-pointer')}
            onClick={() => setCollapseMenu(!isCollapseMenu)}
          >
            <IconBurger />
          </div>
        </div>

        {menuList.map(({ list, title }, idx) => (
          <div className="flex flex-col gap-2.5" key={title}>
            {isCollapseMenu && idx === menuList.length - 1 && (
              <Separator className="mx-auto w-8" />
            )}
            {!isCollapseMenu && <p className="text-gray-vc-400">{title}</p>}
            <div className="flex flex-col gap-2.5">
              {list.map(({ icon, label, link }) => (
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    cn(
                      'relative flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ease-in-out',
                      isActive && !isCollapseMenu ?
                        'bg-gradient-to-r from-blue-50 to-white font-bold text-primary-vc-500'
                      : 'text-gray-vc-600 hover:bg-gray-vc-100'
                    )
                  }
                  key={label}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 top-0 w-1 rounded-r-lg bg-primary-vc-500" />
                      )}
                      <div className="transition-opacity duration-500 ease-in-out">
                        <Icon icon={icon} isActive={isActive} />
                      </div>
                      {!isCollapseMenu && (
                        <span className="whitespace-nowrap transition-opacity duration-500 ease-in">
                          {label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://avatar.iran.liara.run/public/92"
                alt="avatar"
              />
              <AvatarFallback>{dataInfo.name[0]}</AvatarFallback>
            </Avatar>
            {!isCollapseMenu && (
              <div>
                <p>{dataInfo.name}</p>
                <p className="break-all text-sm font-normal text-gray-vc-600">
                  {dataInfo.email}
                </p>
              </div>
            )}
          </div>
          {!isCollapseMenu && (
            <button className="cursor-pointer" onClick={() => mutate()}>
              <IconLogout />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
