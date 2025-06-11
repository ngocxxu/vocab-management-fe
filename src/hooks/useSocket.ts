// hooks/useSocket.ts
import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { toast } from '@/components/ui/use-toast.ts'
import { format } from 'date-fns'
import { initSocket } from '../utils/socket'

export const useSocket = () => {
  useEffect(
    () => {
      const socket = initSocket()
      if (!socket) return

      // Vocab notifications
      socket.on('vocab-notification', (annouce) => {
        switch (annouce.type) {
          case 'deleted':
          case 'multi-deleted':
            toast({
              title: 'Success',
              description: `${annouce.message} by ${annouce.data.userEmail} at ${format(new Date(String(annouce.timestamp)), 'dd/MM/yyyy')}`
            })
            break
          case 'created':
          case 'updated':
          case 'multi-created':
            toast({
              title: 'Info',
              description: `${annouce.message} by ${annouce.data.userEmail} at ${format(new Date(String(annouce.timestamp)), 'dd/MM/yyyy')}`
            })
            break
        }
      })

      // Comment notifications
      socket.on('comment-notification', (annouce) => {
        switch (annouce.type) {
          case 'deleted':
          case 'multi-deleted':
            toast({
              title: 'Success',
              description: annouce.message
            })
            break
          case 'created':
          case 'updated':
            toast({
              title: 'Info',
              description: annouce.message
            })
            break
        }
      })

      return () => {
        socket.off('vocab-notification')
        socket.off('comment-notification')
      }
    },
    [
      // dispatch
    ]
  )
}
