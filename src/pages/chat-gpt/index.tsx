import IconChatGPT from '@/assets/svg/IconChatGPT';
import IconGPT from '@/assets/svg/IconGPT';
import IconPaperSend from '@/assets/svg/IconPaperSend';
import Button from '@/components/button';
import { Textarea } from '@/components/ui/textarea';
import { IconMessage, IconMicrophone, IconTrash } from '@tabler/icons-react';

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
              <div className='flex justify-end py-5'>
                <div className='max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5 dark:bg-token-main-surface-secondary'>
                  The symbol (that is a string) is particularly useful to
                  overcome the limitation of the colors on filenames, so that
                  git can color your newly added file in green but you still
                  have the symbol next to the filename to identify the project.
                </div>
              </div>
              <div className='flex justify-start gap-3 py-5'>
                <div>
                  <IconGPT />
                </div>
                <div>
                  The symbol (that is a string) is particularly useful to
                  overcome the limitation of the colors on filenames, so that
                  git can color your newly added file in green but you still
                  have the symbol next to the filename to identify the project.
                </div>
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
                  className='resize-none focus:outline-none'
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
