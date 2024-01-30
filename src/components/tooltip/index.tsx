import { ReactNode } from "react";
import {
  TooltipContent,
  TooltipLib,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type TTooltip = {
  children: ReactNode;
  body: ReactNode;
};

const Tooltip = ({ children, body }: TTooltip) => {
  return (
    <TooltipProvider>
      <TooltipLib>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{body}</TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  );
};

export default Tooltip;
