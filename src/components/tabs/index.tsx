import { ReactNode } from 'react'
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
}

export const Tabs = ({
  head,
  body,
  className,
  classNameHeader,
  extraHeader
}: TTabs) => {
  return (
    <TabsLib className={className} defaultValue={head[0].value}>
      <div className="flex items-center gap-2">
        <TabsList>
          {head.map(({ content, value }) => (
            <TabsTrigger className={classNameHeader} key={value} value={value}>
              {content}
            </TabsTrigger>
          ))}
        </TabsList>
        {extraHeader && <div>{extraHeader}</div>}
      </div>
      {body &&
        body.length > 0 &&
        body.map(({ content, value }) => (
          <TabsContent key={value} value={value}>
            {content}
          </TabsContent>
        ))}

      <TabsContent value="password">Change your password here.</TabsContent>
    </TabsLib>
  )
}
