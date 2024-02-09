import { ReactNode } from 'react';
import { TabsContent, TabsLib, TabsList, TabsTrigger } from '../ui/tabs';

type TTabs = {
  head: { content: ReactNode; value: string }[];
  body?: {
    content: ReactNode;
    value: string;
  }[];
};

export const Tabs = ({ head, body }: TTabs) => {
  return (
    <TabsLib defaultValue={head[0].value}>
      <TabsList>
        {head.map(({ content, value }) => (
          <TabsTrigger value={value}>{content}</TabsTrigger>
        ))}
      </TabsList>
      {body &&
        body.length > 0 &&
        body.map(({ content, value }) => (
          <TabsContent key={value} value={value}>
            {content}
          </TabsContent>
        ))}

      <TabsContent value='password'>Change your password here.</TabsContent>
    </TabsLib>
  );
};
