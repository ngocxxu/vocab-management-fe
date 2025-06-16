import { ExpandableText } from '@/pages/layout/components/expandedText'
import { TNotification } from '@/pages/layout/types'
import { useGetAllNotification } from '@/services/notification/useGetAllNotification'
import { IconBell, IconChecks, IconPointFilled } from '@tabler/icons-react'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format
} from 'date-fns'
import { Fragment, useEffect, useState } from 'react'
import { Popover } from '../popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ButtonLib } from '../ui/button'
import { Separator } from '../ui/separator'

const NotificationBody = ({
  dataInfo,
  setBackup
}: {
  dataInfo: { name: string; email: string; userId: string }
  setBackup: React.Dispatch<React.SetStateAction<TNotification[]>>
}) => {
  const { data: notifications } = useGetAllNotification(dataInfo.userId)
  const formatTimeAgo = (createdAt: string | Date) => {
    const now = new Date()
    const date = new Date(createdAt)

    const minutes = differenceInMinutes(now, date)
    const hours = differenceInHours(now, date)
    const days = differenceInDays(now, date)

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else if (days <= 3) {
      return `${days}d ago`
    } else {
      return format(date, 'dd/MM/yyyy')
    }
  }

  useEffect(() => {
    setBackup(notifications || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Notification</p>
        <div className="flex cursor-pointer items-center gap-1 text-xs text-primary-vc-500">
          <IconChecks size={20} />
          <div>Mark all as read</div>
        </div>
      </div>

      {notifications &&
        notifications?.length > 0 &&
        notifications.length > 0 &&
        notifications.map((item) => {
          return (
            <Fragment key={item.createdAt.toString()}>
              <Separator className="my-3" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex-none">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${item.data.name}`}
                      alt={item.data.name.toString()[0]}
                    />
                    <AvatarFallback>
                      {item.data.name.toString()[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold capitalize">
                      {item.type}
                    </p>
                    <span className="text-nowrap text-xs text-neutral-500">
                      {formatTimeAgo(item.createdAt)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <ExpandableText
                      text={
                        item.data.message.toString() + ' by ' + item.data.name
                      }
                      maxLength={60}
                    />
                  </div>
                </div>

                <div className="flex-none">
                  <IconPointFilled className="text-primary-vc-500" size={20} />
                </div>
              </div>
            </Fragment>
          )
        })}

      <div className="flex items-center justify-center pt-7">
        <ButtonLib className="h-0" variant="link">
          View all
        </ButtonLib>
      </div>
    </>
  )
}
export const Notification = () => {
  const [dataInfo, setDataInfo] = useState({ name: '', email: '', userId: '' })
  const [open, setOpen] = useState(false)
  const [backup, setBackup] = useState<TNotification[]>([])

  const handleAppearCircle = () => {
    if (backup.length > 0) {
      return (
        backup.filter(
          (item) =>
            item.readBy.length > 0 &&
            item.readBy.find((f) => f.userId === dataInfo.userId)
        ).length === backup.length
      )
    }
    return false
  }

  useEffect(() => {
    const storedData = localStorage.getItem('userInfo')

    if (storedData) {
      setDataInfo(JSON.parse(storedData))
    }
  }, [])

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      align="end"
      side="bottom"
      head={
        <div className="relative">
          {!handleAppearCircle() && (
            <div className="absolute -right-2 -top-3">
              <IconPointFilled className="text-primary-vc-500" size={20} />
            </div>
          )}
          <IconBell className="cursor-pointer" size={24} />
        </div>
      }
      body={<NotificationBody dataInfo={dataInfo} setBackup={setBackup} />}
      className="w-[400px] max-w-full bg-white"
    />
  )
}
