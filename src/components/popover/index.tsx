import {
  PopoverContent,
  PopoverLib,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

type TPopover = {
  head: ReactNode;
  body: ReactNode;
};

export function Popover({ head, body }: TPopover) {
  return (
    <PopoverLib>
      <PopoverTrigger asChild>{head}</PopoverTrigger>
      <PopoverContent className="w-80">{body}</PopoverContent>
    </PopoverLib>
  );
}
