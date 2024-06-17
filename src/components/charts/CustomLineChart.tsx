import { dataLine } from '@/pages/dashboard/constants'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={dataLine}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Line
          type="linear"
          dataKey="uv"
          stroke="hsl(var(--primary))"
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart
