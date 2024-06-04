import IconChatGPT from '@/assets/svg/IconChatGPT';
import IconPaperSend from '@/assets/svg/IconPaperSend';
import Avatar from '@/components/avatar';
import Button from '@/components/button';
import { Textarea } from '@/components/ui/textarea';
import { IconMicrophone } from '@tabler/icons-react';
import { IconMessage, IconTrash } from '@tabler/icons-react';

const ChatGPT = () => {
  return (
    <div className='container my-10'>
      <div
        className='grid grid-cols-12 bg-white rounded-md font-semibold shadow-md border-t'
        style={{
          height: 'calc(100vh - 50px - 44px - 80px)',
        }}
      >
        <div className='col-span-3 border-r-2 p-6 flex flex-col justify-between'>
          <div>
            <Button type='button' classNames='w-full' title='+ New chat' />

            <Button
              variant='ghost'
              type='button'
              classNames='w-full mt-3'
              title='AI Chat Tool Ethics'
              leftIcon={<IconMessage />}
              classNameTitle='ml-3'
            />
          </div>

          <div className='border-t-2 p-2'>
            <Button
              variant='ghost'
              type='button'
              classNames='w-full'
              title='Clear conversations'
              leftIcon={<IconTrash />}
            />
          </div>
        </div>
        <div className='p-6 grid grid-rows-12 col-span-9 overflow-y-auto'>
          <div className='row-span-4 flex item-center justify-center mt-auto'>
            <IconChatGPT />
          </div>
          <div className='row-span-8 relative'>
            <div>
              <div className='flex justify-start items-start mb-4'>
                <Avatar className='text-white'>N</Avatar>
                <div className='p-2'>Hello vietnam</div>
              </div>
              <div className='flex justify-start items-start mb-4'>
                <Avatar className='text-white'>GPT</Avatar>
                <div className='p-2'>Hello vietnam</div>
              </div>
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
              <div className='flex justify-center items-center gap-2'>
                <Button
                  variant='ghost'
                  type='button'
                  leftIcon={<IconMicrophone />}
                />
                <Textarea
                  className='resize-none'
                  rows={1}
                  placeholder='Type message'
                />
                <Button
                  variant='ghost'
                  type='button'
                  leftIcon={<IconPaperSend />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;
