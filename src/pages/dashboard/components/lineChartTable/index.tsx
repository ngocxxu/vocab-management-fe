import CustomLineChart from '@/components/charts/CustomLineChart'
import { HelpContent } from '@/components/helpContent'
import { Tabs } from '@/components/tabs'
import { Separator } from '@/components/ui/separator'
import { IconPointFilled } from '@tabler/icons-react'

const LineChartTable = () => {
  return (
    <div className="rounded-xl border-t p-8 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div className="mb-auto flex gap-1">
          <h1 className="text-xl font-semibold">Learning progress</h1>
          <HelpContent content="This is a description of the chart." />
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
      <div className="flex gap-4">
        <div className="flex items-center">
          <IconPointFilled className="text-primary-vc-500" size={20} />
          <p>Mastered</p>
        </div>
        <div className="flex items-center">
          <IconPointFilled className="text-warning-vc-400" size={20} />
          <p>New Vocab</p>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="h-72 max-h-full">
        <CustomLineChart />
      </div>
    </div>
  )
}

export default LineChartTable
