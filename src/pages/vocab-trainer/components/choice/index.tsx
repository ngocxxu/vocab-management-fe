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
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer';
import { RootState } from '@/redux/store';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { TQuestion } from '../../types';

type TFormChoice = { wordTestSelects: { idWord: string }[] };

type TChoiceProps = {
  data: TQuestion[];
};

export const Choice = ({ data }: TChoiceProps) => {
  const form = useForm<TFormChoice>({
    defaultValues: {
      wordTestSelects: [{ idWord: '' }],
    },
  });
  const { orderQuestion } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'wordTestSelects',
  });

  const onSubmit: SubmitHandler<TFormChoice> = (formData) => {
    const newArr = formData.wordTestSelects.map((item, index) => ({
      ...item,
      userSelect:
        data &&
        data[index].options.find((item2) => item2.value === item.idWord)?.label,
    }));

    console.log(newArr);
  };

  return (
    <div className='bg-white rounded-md p-4 border-t shadow-md'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <fieldset key={field.id}>
              <p className='font-semibold'>Question</p>
              <div className='bg-customGray6 p-3 rounded-md mt-3 mb-5 font-medium text-sm'>
                Please choose the meaning of the word
                <span className='font-bold ml-1 text-white bg-customBlue p-1 rounded'>
                  {data[index].content.join(', ')}
                </span>
              </div>
              <p className='font-semibold mb-3'>Choice</p>
              <FormField
                control={form.control}
                name={`wordTestSelects.${index}.idWord`}
                render={({ field }) => (
                  <FormItem className='space-y-3 mb-8'>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className='flex flex-col space-y-1'
                        {...field}
                      >
                        {data[index].options.map((item) => {
                          return (
                            <FormItem
                              key={item.value}
                              className='flex items-center space-x-3 space-y-0 px-3 bg-customGray6 rounded-md'
                            >
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className='font-medium w-full py-3'>
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
            </fieldset>
          ))}

          <div className='flex justify-center items-center w-full gap-2 mt-4'>
            <Button
              disabled={orderQuestion === 1}
              variant='ghost'
              title='Previous'
            />
            <Button
              disabled={
                !form.watch(`wordTestSelects.${orderQuestion - 1}.idWord`)
              }
              title={orderQuestion === data.length ? 'Submit' : 'Next'}
              onClick={() => {
                append({ idWord: '' });
                setOrderQuestion(orderQuestion + 1);
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
