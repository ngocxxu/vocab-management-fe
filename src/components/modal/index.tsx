import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogLib,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type TModal = {
  head: ReactNode;
  body: ReactNode;
  title?: string;
};

export const Modal = ({
  head,
  body,
  open,
  onOpenChange,
  title,
  ...props
}: TModal &
  DialogPrimitive.DialogProps &
  DialogPrimitive.DialogContentProps) => {
  return (
    <DialogLib open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{head}</DialogTrigger>
      <DialogContent {...props}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
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
