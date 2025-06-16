import { EActionSocket, ETypeSocket } from '@/utils/enum'

export type TNotification = {
  type: ETypeSocket
  action: EActionSocket
  recipients: string[]
  data: Record<string, string | number | boolean>
  readBy: {
    userId: string
    readAt: string | Date
  }[]
  isActive: boolean
  createdAt: string | Date
}
