import { EVocabTrainerStatus } from '@/pages/vocab-trainer/enum'

export const dataPie = [
  { id: '1', status: 'Total', value: 5000, color: 'hsl(var(--input))' },
  {
    id: '2',
    status: EVocabTrainerStatus.PASSED,
    value: 2500,
    color: 'hsl(var(--success))'
  },
  { id: '3', status: EVocabTrainerStatus.PENDING, value: 2000, color: 'hsl(var(--primary))' },
  { id: '4', status: EVocabTrainerStatus.FAILED, value: 500, color: 'hsl(var(--error))' }
]

export const dataLine = [
  { name: '1 Jan', uv: 4000 },
  { name: '3 Jan', uv: 3000 },
  { name: '7 Jan', uv: 2000 },
  { name: '10 Jan', uv: 2780 },
  { name: '14 Jan', uv: 1890 },
  { name: '20 Jan', uv: 2390 },
  { name: '23 Jan', uv: 1000 },
  { name: '27 Jan', uv: 2000 },
  { name: '30 Jan', uv: 3500 }
]
