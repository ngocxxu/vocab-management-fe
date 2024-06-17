import { Separator } from '@/components/ui/separator'
import { IconCircleFilled } from '@tabler/icons-react'
import { dataPie } from '../../constants'

export const TablePieChart = () => {
  return (
    <div className="flex flex-col justify-center gap-3 text-sm">
      <div className="flex items-center justify-between font-medium">
        <div>Status</div>
        <div>Words</div>
      </div>
      <Separator />
      {dataPie.map(({ status, value, color }) => (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCircleFilled style={{ color }} size="0.8rem" />
            <div className="text-secondary-foreground">{status}</div>
          </div>
          <div className="font-medium">{value}</div>
        </div>
      ))}
    </div>
  )
}
