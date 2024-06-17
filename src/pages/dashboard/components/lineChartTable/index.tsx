import CustomLineChart from '@/components/charts/CustomLineChart'
import { Tabs } from '@/components/tabs'

const LineChartTable = () => {
  return (
    <div className="rounded-xl border-t p-8 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Daily Status</h1>
          <p className="text-sm text-secondary-foreground">Statictics</p>
        </div>
        <Tabs
          head={[
            {
              content: 'Day',
              value: 'Day'
            },
            {
              content: 'Week',
              value: 'Week'
            },
            {
              content: 'Month',
              value: 'Month'
            },
            {
              content: 'Year',
              value: 'Year'
            }
          ]}
        />
      </div>
      <div className="h-64">
        <CustomLineChart />
      </div>
    </div>
  )
}

export default LineChartTable
