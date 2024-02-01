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
  ...props
}: TPopover & PopoverPrimitive.PopperContentProps) {
  return (
    <PopoverLib>
      <PopoverTrigger asChild>{head}</PopoverTrigger>
      <PopoverContent {...props}>{body}</PopoverContent>
    </PopoverLib>
  );
}
