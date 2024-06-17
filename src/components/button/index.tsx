import { ButtonLib, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type TButton = {
  title?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  classNames?: string
  classNameTitle?: string
}

const Button = ({
  type = 'button',
  title,
  leftIcon,
  rightIcon,
  classNames,
  classNameTitle,
  variant,
  ...props
}: TButton & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  return (
    <ButtonLib
      type={type}
      variant={variant}
      className={cn(classNames)}
      {...props}
    >
      {leftIcon && leftIcon}
      <span className={classNameTitle}>{title}</span>
      {rightIcon && rightIcon}
    </ButtonLib>
  )
}

export default Button
