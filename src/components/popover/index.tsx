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
}: TPopover &
  PopoverPrimitive.PopoverProps &
  PopoverPrimitive.PopperContentProps) {
  return (
    <PopoverLib>
      <PopoverTrigger asChild>{head}</PopoverTrigger>
      <PopoverContent {...props}>
        {body}
        {/* <PopoverClose>
          <Button
            className="absolute bottom-10 right-40"
            title="Cancel"
            variant="ghost"
          />
        </PopoverClose> */}
      </PopoverContent>
    </PopoverLib>
  );
}
