import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import {
  TooltipContent,
  TooltipLib,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

type TTooltip = {
  children: ReactNode
  body: ReactNode
  className?: string
}

const Tooltip = ({ children, body, className }: TTooltip) => {
  return (
    <TooltipProvider delayDuration={300}>
      <TooltipLib>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn('bg-primary text-primary-foreground', className)}
        >
          {body}
        </TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  )
}

export default Tooltip
