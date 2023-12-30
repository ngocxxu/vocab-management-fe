import SimpleBarChart from './SimpleBarChart';
import './style.scss';

const ChartTable = () => {
  return (
    <div className='m-20'>
      <div className='chart-table-title flex justify-between'>
        <p className='text-sm'>Quick Summary</p>
        <div className='join'>
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='React'
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Angular'
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Vue'
          />
        </div>
      </div>
      <SimpleBarChart />
    </div>
  );
};

export default ChartTable;
