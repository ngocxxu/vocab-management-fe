import CustomPieChart from '@/components/charts/CustomPieChart'
import Tooltip from '@/components/tooltip'
import { TablePieChart } from '@/pages/dashboard/components/tablePieChart'
import { IconExclamationCircle } from '@tabler/icons-react'

const PieChartTable = () => {
  return (
    <div className="rounded-xl border-t p-8 shadow-md">
      <div>
        <h1 className="font-semibold">Vocabulary Quantity</h1>
        <div className="flex items-center gap-1 text-secondary-foreground">
          <p className="text-sm">
            The rate is based on the total number of vocabulary you registered
          </p>
          <Tooltip
            children={<IconExclamationCircle size="1.2rem" />}
            body={<>Registered vocabulary statistics</>}
          />
        </div>
      </div>
      <div className="grid h-64 gap-2 md:grid-cols-3">
        <div className="col-span-2">
          <CustomPieChart />
        </div>
        <TablePieChart />
      </div>
    </div>
  )
}

export default PieChartTable
