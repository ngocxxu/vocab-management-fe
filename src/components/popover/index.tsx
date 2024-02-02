import {
  PopoverContent,
  PopoverLib,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ReactNode } from "react";

type TPopover = {
  head: ReactNode;
  body: ReactNode;
};

export function Popover({
  head,
  body,
  open,
  onOpenChange,
  ...props
}: TPopover &
  PopoverPrimitive.PopoverProps &
  PopoverPrimitive.PopperContentProps) {
  return (
    <PopoverLib open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{head}</PopoverTrigger>
      <PopoverContent {...props}>{body}</PopoverContent>
    </PopoverLib>
  );
}
