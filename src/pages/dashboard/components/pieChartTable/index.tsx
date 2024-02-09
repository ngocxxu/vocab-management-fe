import CustomPieChart from '@/components/charts/CustomPieChart';
import Tooltip from '@/components/tooltip';
import { TablePieChart } from '@/pages/dashboard/components/tablePieChart';
import { IconExclamationCircle } from '@tabler/icons-react';

const PieChartTable = () => {
  return (
    <div className='p-8 rounded-xl shadow-md border-t'>
      <div>
        <h1 className='font-semibold'>Vocabulary Quantity</h1>
        <div className='flex items-center gap-1 text-customGray'>
          <p className='text-sm'>
            The rate is based on the total number of vocabulary you registered
          </p>
          <Tooltip
            children={<IconExclamationCircle size='1.2rem' />}
            body={<>Registered vocabulary statistics</>}
          />
        </div>
      </div>
      <div className='h-64 grid md:grid-cols-3 gap-2'>
        <div className='col-span-2'>
          <CustomPieChart />
        </div>
        <TablePieChart />
      </div>
    </div>
  );
};

export default PieChartTable;
