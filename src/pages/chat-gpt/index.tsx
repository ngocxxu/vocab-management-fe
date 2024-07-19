import IconChatGPT from '@/assets/svg/IconChatGPT'
import IconGPT from '@/assets/svg/IconGPT'
import IconPaperSend from '@/assets/svg/IconPaperSend'
import Button from '@/components/button'
import { Textarea } from '@/components/ui/textarea'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { IconMessage, IconMicrophone } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { EMessageType } from './constants'
import { TMessage } from './types'

const ChatGPT = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<TMessage[]>([])
  const [loading, setLoading] = useState(false)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const getResponseForGivenPrompt = async () => {
    if (!inputValue.trim()) return

    try {
      setLoading(true)
      setMessages((prev) => [
        ...prev,
        { type: EMessageType.USER, content: inputValue },
        { type: EMessageType.AI, content: '' }
      ])

      const model = genAI.getGenerativeModel({
        model: import.meta.env.VITE_GEMINI_MODEL
      })
      const result = await model.generateContent(inputValue)
      const response = result.response
      const text = response.text()

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: EMessageType.AI, content: text }
      ])
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setMessages((prev) => [
        ...prev,
        {
          type: EMessageType.AI,
          content: 'Sorry, an error occurred. Please try again.'
        }
      ])
    }
  }

  return (
    <div className="container">
      <div
        className="grid grid-cols-12 rounded-md border-t bg-primary-foreground font-semibold shadow-md"
        style={{
          height: 'calc(100vh - 50px - 44px - 80px)'
        }}
      >
        <div className="col-span-3 flex flex-col justify-between border-r-2 p-6">
          <div>
            <Button type="button" classNames="w-full" title="+ New chat" />

            <Button
              variant="ghost"
              type="button"
              classNames="w-full mt-3"
              title="AI Chat Tool Ethics"
              leftIcon={<IconMessage />}
              classNameTitle="ml-3"
            />
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-9 grid grid-rows-12 overflow-y-auto p-6">
          <div className="row-span-11 overflow-y-auto">
            {messages.length === 0 ?
              <div className="flex h-full items-center justify-center">
                <IconChatGPT />
              </div>
            : messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === EMessageType.USER ? 'justify-end' : 'justify-start'} py-2`}
                >
                  {message.type === EMessageType.AI && <IconGPT />}
                  {!message.content ?
                    <Loader2 />
                  : <ReactMarkdown
                      className={`ml-2 max-w-[70%] rounded-lg px-4 py-2 ${
                        message.type === EMessageType.USER ?
                          'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                      }`}
                    >
                      {message.content}
                    </ReactMarkdown>
                  }
                </div>
              ))
            }
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="row-span-1">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                type="button"
                leftIcon={<IconMicrophone />}
              />
              <Textarea
                className="resize-none focus:outline-none"
                rows={1}
                placeholder="Type message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    getResponseForGivenPrompt()
                    setInputValue('')
                  }
                }}
              />
              <Button
                onClick={getResponseForGivenPrompt}
                variant="ghost"
                type="button"
                leftIcon={
                  loading ?
                    <Loader2 className="animate-spin" />
                  : <IconPaperSend />
                }
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatGPT
