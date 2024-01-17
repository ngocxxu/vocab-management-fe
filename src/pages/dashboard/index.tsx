import toast from 'react-hot-toast';
import ChartTable from '../../components/charts';

const Dashboard = () => {
  const showToastMessage = () => toast.success('Here is your toast.');
  return (
    <>
      <div className='container mx-auto'>
        <button onClick={showToastMessage}>Notify!</button>
        <div className='shadow-md'>
          <ChartTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
