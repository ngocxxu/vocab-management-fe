import io, { Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = () => {
  const token = localStorage.getItem('accessToken')

  if (!token || socket) return socket

  socket = io(import.meta.env.VITE_APP_BE, {
    auth: { token }
  })

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message)
    if (error.message.includes('Token expired')) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
