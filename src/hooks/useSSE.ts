import { toast } from '@/components/ui/use-toast.ts'
import { NOTIFICATION_KEYS } from '@/services/notification/queryKeys'
import { VOCAB_KEYS } from '@/services/vocab/queryKeys'
import { EActionSocket, EEmitSocket } from '@/utils/enum'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { initSSE } from '../utils/sse'
import { SSE } from '@/services/endPoints'

const { DELETED, CREATED, UPDATED, MULTI_CREATED, MULTI_DELETED } = EActionSocket
const { VOCAB_NOTIFICATION } = EEmitSocket

interface SSEEvent {
  type: string
  data: {
    action: string
    data: {
      message: string
      email: string
    }
    timestamp: string
  }
}

export const useSSE = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data: SSEEvent = JSON.parse(event.data)
        
        // Handle vocab notifications
        if (data.type === VOCAB_NOTIFICATION) {
          switch (data.data.action) {
            case CREATED:
            case UPDATED:
            case DELETED:
            case MULTI_CREATED:
            case MULTI_DELETED:
              toast({
                title: 'Info',
                description: `${data.data.data.message} by ${data.data.data.email} at ${format(new Date(String(data.data.timestamp)), 'dd/MM/yyyy')}`
              })

              queryClient.invalidateQueries({ queryKey: [VOCAB_KEYS.GET_VOCAB] })
              queryClient.invalidateQueries({
                queryKey: [NOTIFICATION_KEYS.GET_NOTIFICATION]
              })
              break
          }
        }

        // Handle comment notifications
        if (data.type === 'comment-notification') {
          switch (data.data.action) {
            case 'deleted':
            case 'multi-deleted':
              toast({
                title: 'Success',
                description: data.data.data.message
              })
              break
            case 'created':
            case 'updated':
              toast({
                title: 'Info',
                description: data.data.data.message
              })
              break
          }
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error)
      }
    }

    const handleError = (error: Event) => {
      console.error('SSE connection error:', error)
    }

    // Initialize SSE connection
    const sseUrl = `${import.meta.env.VITE_APP_API_URL}${SSE.getEvents}`
    initSSE(sseUrl, handleMessage, handleError)

    // Cleanup function
    return () => {
      // SSE cleanup will be handled by the disconnectSSE function
    }
  }, [queryClient])
} 