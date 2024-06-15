import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import clsx from 'clsx'
import { Badge } from '../badge'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className={clsx(
              'bg-customGreen4',
              title === 'Error' && 'bg-customRed3'
            )}
            key={id}
            {...props}
          >
            <div className="flex gap-2">
              {title && (
                <ToastTitle>
                  <Badge
                    className={clsx(
                      'gap-2 text-white',
                      'bg-customGreen',
                      title === 'Error' && 'bg-customRed'
                    )}
                    variant="outline"
                  >
                    {title}
                  </Badge>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
