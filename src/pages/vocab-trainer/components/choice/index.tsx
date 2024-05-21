'use client';

import Button from '@/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';

const data = [
  { label: 'Làm, làm việc', value: '65c8b421ac76718ef413c376' },
  { label: 'Mịt mờ', value: '65b93103a21450a1bf9c7004' },
  { label: 'Không biết', value: '65c895c208b9d1cdca7e1f7b' },
  { label: 'Mối quan tâm', value: '65b93116a21450a1bf9c706c' },
];

export const Choice = () => {
  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  {data.map((item) => {
                    return (
                      <FormItem
                        key={item.value}
                        className='flex items-center space-x-3 space-y-0 bg-customGray6 p-3 rounded-md'
                      >
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className='font-medium'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-center items-center w-full gap-2 mt-4'>
          <Button variant='ghost' type='submit' title='Previous' />
          <Button type='submit' title='Next' />
        </div>
      </form>
    </Form>
  );
};
