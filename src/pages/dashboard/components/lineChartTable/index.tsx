import CustomLineChart from '@/components/charts/CustomLineChart';
import { Tabs } from '@/components/tabs';

const LineChartTable = () => {
  return (
    <div className='p-8 rounded-xl shadow-md border-t'>
      <div className='mb-5 flex justify-between items-center'>
        <div>
          <h1 className='font-semibold'>Daily Status</h1>
          <p className='text-sm text-customGray'>Statictics</p>
        </div>
        <Tabs
          head={[
            {
              content: 'Day',
              value: 'Day',
            },
            {
              content: 'Week',
              value: 'Week',
            },
            {
              content: 'Month',
              value: 'Month',
            },
            {
              content: 'Year',
              value: 'Year',
            },
          ]}
        />
      </div>
      <div className='h-64'>
        <CustomLineChart />
      </div>
    </div>
  );
};

export default LineChartTable;
