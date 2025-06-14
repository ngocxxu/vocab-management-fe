import LineChartTable from './components/lineChartTable'
import { NoticeCalendar } from './components/noticeCalendar'
import PieChartTable from './components/pieChartTable'
import Statistics from './components/statistics'

const Dashboard = () => {
  return (
    <div className="container mx-auto mb-5">
      <Statistics />
      <div className="grid grid-cols-2 gap-5">
        <PieChartTable />
        <NoticeCalendar />
        <div className="col-span-2">
          <LineChartTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
