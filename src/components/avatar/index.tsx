import { cn } from '@/lib/utils'
import { AvatarProps } from '@radix-ui/react-avatar'
import { ReactNode } from 'react'
import { AvatarFallback, AvatarLib } from '../ui/avatar'

type TAvatar = {
  children: ReactNode
  classNameContent?: string
}

const Avatar = ({
  children,
  classNameContent,
  ...props
}: TAvatar & AvatarProps) => {
  return (
    <AvatarLib {...props}>
      <AvatarFallback className={cn(classNameContent)}>
        {children}
      </AvatarFallback>
    </AvatarLib>
  )
}

export default Avatar
