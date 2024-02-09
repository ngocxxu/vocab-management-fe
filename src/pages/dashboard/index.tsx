import LineChartTable from './components/lineChartTable';
import { NoticeCalendar } from './components/noticeCalendar';
import PieChartTable from './components/pieChartTable';

const Dashboard = () => {
  return (
    <div className='container mx-auto mb-5'>
      <h1 className='text-2xl font-semibold mt-5 mb-3'>Welcome,</h1>
      <div className='grid grid-cols-2 gap-5'>
        <PieChartTable />
        <NoticeCalendar />
        <div className='col-span-2'>
          <LineChartTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
