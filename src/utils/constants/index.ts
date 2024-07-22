import { statusList } from '@/pages/vocab/constants'

export const LIMIT_PAGE_10 = '10'
export const DEAULT_PAGE = '1'
export const defaultStatus = [...statusList.map(item => item.value)]
export const ROUTER_VOCAB_TRAINER = '/vocab-trainer'

export const DEFAULT_COUNTDOWN = 300

export const colorData = [
  {
    status: 'Passed',
    background: 'hsl(var(--success))',
    text: 'hsl(var(--primary-foreground))',
  },
  {
    status: 'Failed',
    background: 'hsl(var(--error))',
    text: 'hsl(var(--primary-foreground))',
  },
  {
    status: 'Pending',
    background: 'hsl(var(--accent))',
    text: 'hsl(var(--primary-foreground))',
  }
]

export const limitData = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
]