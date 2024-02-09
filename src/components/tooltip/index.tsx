import { ReactNode } from 'react';
import {
  TooltipContent,
  TooltipLib,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type TTooltip = {
  children: ReactNode;
  body: ReactNode;
};

const Tooltip = ({ children, body }: TTooltip) => {
  return (
    <TooltipProvider delayDuration={300}>
      <TooltipLib>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className='bg-customBlue2 text-white'>
          {body}
        </TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  );
};

export default Tooltip;
