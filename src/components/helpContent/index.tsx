import { IconHelp } from '@tabler/icons-react'
import { TooltipContent, TooltipLib, TooltipTrigger } from '../ui/tooltip'

export const HelpContent = ({ content }: { content: string }) => {
  return (
    <TooltipLib>
      <TooltipTrigger>
        <IconHelp className="text-gray-vc-400" size={18} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </TooltipLib>
  )
}
