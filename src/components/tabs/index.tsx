import { cn } from '@/lib/utils'
import { TabsProps } from '@radix-ui/react-tabs'
import { Fragment, ReactNode } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { TabsContent, TabsLib, TabsList, TabsTrigger } from '../ui/tabs'

type TTabs = {
  head: { content: ReactNode; value: string }[]
  body?: {
    content: ReactNode
    value: string
  }[]
  className?: string
  classNameHeader?: string
  extraHeader?: ReactNode
  removeItemTab?: (idx: number) => ReactNode
}

export const Tabs = ({
  head,
  body,
  className,
  classNameHeader,
  extraHeader,
  removeItemTab,
  ...props
}: TTabs & TabsProps) => {
  return (
    <TabsLib className={className} defaultValue={head[0].value} {...props}>
      <div className="flex items-center gap-2">
        <ScrollArea className="max-w-[90vh]">
          <TabsList>
            {head.map(({ content, value }, idx) => (
              <Fragment key={value}>
                <TabsTrigger className={classNameHeader} value={value}>
                  {content}
                </TabsTrigger>
                {removeItemTab && idx > 0 && (
                  <div
                    className={cn(
                      'flex h-full items-center pr-1',
                      props.value === String(idx) &&
                        'border-l-gray rounded-br-sm rounded-tr-sm border-l bg-white'
                    )}
                  >
                    {removeItemTab(idx)}
                  </div>
                )}
              </Fragment>
            ))}
          </TabsList>

          <ScrollBar className="bg-gray-vc-300" orientation="horizontal" />
        </ScrollArea>
        {extraHeader && <div>{extraHeader}</div>}
      </div>
      {body &&
        body.length > 0 &&
        body.map(({ content, value }) => (
          <TabsContent key={value} value={value}>
            {content}
          </TabsContent>
        ))}
    </TabsLib>
  )
}
