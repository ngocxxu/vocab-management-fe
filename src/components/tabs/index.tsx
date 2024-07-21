import { ReactNode } from 'react'
import { TabsContent, TabsLib, TabsList, TabsTrigger } from '../ui/tabs'

type TTabs = {
  head: { content: ReactNode; value: string }[]
  body?: {
    content: ReactNode
    value: string
  }[]
  className?: string
}

export const Tabs = ({ head, body, className }: TTabs) => {
  return (
    <TabsLib className={className} defaultValue={head[0].value}>
      <TabsList>
        {head.map(({ content, value }) => (
          <TabsTrigger key={value} value={value}>
            {content}
          </TabsTrigger>
        ))}
      </TabsList>
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
