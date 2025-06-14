import LineChartTable from './components/lineChartTable'
import Statistics from './components/statistics'

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className='flex flex-col gap-6'>
        <Statistics />
        <LineChartTable />
      </div>
    </div>
  )
}

export default Dashboard
