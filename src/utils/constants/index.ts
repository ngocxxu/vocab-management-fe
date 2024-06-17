import { statusList } from '@/pages/vocab/constants'

export const LIMIT_PAGE_10 = '10'
export const DEAULT_PAGE = '1'
export const defaultStatus = [...statusList.map(item => item.value)]
export const ROUTER_VOCAB_TRAINER = '/vocab-trainer'

export const DEFAULT_COUNTDOWN = 1200

export const colorData = [
  {
    status: 'Passed',
    background: 'hsl(var(--success))',
    text: 'hsl(var(--primary-foreground))',
    dot: 'hsl(var(--success))'
  },
  {
    status: 'Failed',
    background: 'hsl(var(--error))',
    text: 'hsl(var(--primary-foreground))',
    dot: 'hsl(var(--destructive))'
  },
  {
    status: 'Pending',
    background: 'hsl(var(--muted))',
    text: 'hsl(var(--primary-foreground))',
    dot: 'hsl(var(--muted-foreground))'
  }
]
