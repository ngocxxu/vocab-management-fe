import {
  TooltipContent,
  TooltipLib,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CircleHelp } from 'lucide-react'
import { ReactNode } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogLib,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'

type TModal = {
  head?: ReactNode
  body: ReactNode
  title?: string
  titleTips?: string
  description?: string
}

export const Modal = ({
  head,
  body,
  open,
  onOpenChange,
  title,
  titleTips,
  description,
  ...props
}: TModal &
  DialogPrimitive.DialogProps &
  DialogPrimitive.DialogContentProps) => {
  return (
    <DialogLib open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{head}</DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} {...props}>
        <DialogHeader>
          {title && (
            <DialogTitle>
              <div>
                <div className="flex items-center gap-4">
                  <h4 className="mb-2 font-semibold">{title}</h4>

                  {titleTips && (
                    <TooltipProvider>
                      <TooltipLib>
                        <TooltipTrigger>
                          <CircleHelp className="mb-1" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{titleTips}</p>
                        </TooltipContent>
                      </TooltipLib>
                    </TooltipProvider>
                  )}
                </div>
                {description && (
                  <p className="text-sm font-normal text-secondary-foreground">
                    {description}
                  </p>
                )}
              </div>
            </DialogTitle>
          )}
        </DialogHeader>
        {body}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </DialogLib>
  )
}
