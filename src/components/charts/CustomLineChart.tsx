import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const data = [
  { month: 'Jan', blue: 70, yellow: 53 },
  { month: 'Feb', blue: 53, yellow: 53 },
  { month: 'Mar', blue: 90, yellow: 53 },
  { month: 'Apr', blue: 38, yellow: 38 },
  { month: 'May', blue: 53, yellow: 70 },
  { month: 'Jun', blue: 53, yellow: 100 },
  { month: 'Jul', blue: 85, yellow: 85 },
  { month: 'Aug', blue: 25, yellow: 53 },
  { month: 'Sep', blue: 73, yellow: 53 },
  { month: 'Oct', blue: 53, yellow: 53 },
  { month: 'Nov', blue: 88, yellow: 53 },
  { month: 'Dec', blue: 55, yellow: 73 }
]

const ChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barCategoryGap="20%">
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="#e0e0e0"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <Tooltip
          contentStyle={{
            // backgroundColor: '#333',
            border: 'none',
            borderRadius: '4px',
            color: 'white'
          }}
        />
        <Bar
          className="fill-primary-vc-500"
          dataKey="blue"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="yellow"
          className="fill-warning-vc-400"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ChartComponent
