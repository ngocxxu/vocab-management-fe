import IconBooks from '@/assets/svg/IconBooks'
import IconPencil from '@/assets/svg/IconPencil'
import IconUniversity from '@/assets/svg/IconUniversity'
import { cn } from '@/lib/utils'
import {
  IconAlertTriangleFilled,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react'

const list = [
  {
    value: 500,
    label: 'total vocab',
    changePercent: 2.5,
    trend: 'increase'
  },
  {
    value: 300,
    label: 'new vocab',
    changePercent: 5.7,
    trend: 'increase'
  },
  {
    value: 200,
    label: 'not know',
    changePercent: 7.5,
    trend: 'decrease'
  },
  {
    value: 100,
    label: 'mastered',
    changePercent: 1.1,
    trend: 'increase'
  }
]

const listCss = [
  {
    textColor: 'text-primary-vc-500',
    bgColor: 'bg-primary-vc-500',
    circleColor: 'bg-primary-vc-300',
    icon: <IconBooks fill="#fff" />
  },
  {
    textColor: 'text-success-vc-500',
    bgColor: 'bg-success-vc-500',
    circleColor: 'bg-success-vc-400',
    icon: <IconPencil fill="#fff" />
  },
  {
    textColor: 'text-error-vc-400',
    bgColor: 'bg-error-vc-400',
    circleColor: 'bg-error-vc-300',
    icon: <IconAlertTriangleFilled size={38} />
  },
  {
    textColor: 'text-warning-vc-400',
    bgColor: 'bg-warning-vc-400',
    circleColor: 'bg-warning-vc-300',
    icon: <IconUniversity fill="#fff" />
  }
]

const Statistics = () => {
  return (
    <div className="grid grid-cols-4 gap-4 text-white">
      {list.map((item, idx) => (
        <div
          className={cn(
            'flex items-center justify-between rounded-xl p-8 px-5',
            `${listCss[idx].bgColor}`
          )}
          key={item.label}
        >
          <div
            className={cn('rounded-full p-2', `${listCss[idx].circleColor}`)}
          >
            {listCss[idx].icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm capitalize">{item.label}</p>
          </div>
          <div className={cn('mb-auto flex gap-1 rounded-full')}>
            {item.trend === 'increase' ?
              <IconTrendingUp />
            : <IconTrendingDown />}

            <div
              className={cn(
                'flex gap-1 rounded-full bg-white p-1 py-0 text-sm',
                `${listCss[idx].textColor}`
              )}
            >
              {item.trend === 'increase' ? '+' : '-'}
              {item.changePercent}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Statistics
