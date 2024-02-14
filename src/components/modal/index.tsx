import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogLib,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type TModal = {
  head: ReactNode;
  body: ReactNode;
  title?: string;
  description?: string;
};

export const Modal = ({
  head,
  body,
  open,
  onOpenChange,
  title,
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
                <h4 className='font-semibold mb-2'>{title}</h4>
                {description && (
                  <p className='text-sm text-customGray font-normal'>
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
  );
};
