import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Badge } from '../badge'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className={cn('bg-success', title === 'Error' && 'bg-error')}
            key={id}
            {...props}
          >
            <div className="flex gap-2">
              {title && (
                <ToastTitle>
                  <Badge
                    className={cn(
                      'gap-2 text-primary-foreground',
                      'bg-success',
                      title === 'Error' && 'bg-error'
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
