import { cn } from '@/lib/utils'
import { AvatarProps } from '@radix-ui/react-avatar'
import { ReactNode } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

type TAvatar = {
  children: ReactNode
  classNameContent?: string
}

const AvatarLib = ({
  children,
  classNameContent,
  ...props
}: TAvatar & AvatarProps) => {
  return (
    <Avatar {...props}>
      <AvatarFallback className={cn(classNameContent)}>
        {children}
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarLib
