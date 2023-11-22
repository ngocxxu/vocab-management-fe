import { Flex, Segmented, Typography } from 'antd';
import SimpleBarChart from './SimpleBarChart';
import './style.scss';

const ChartTable = () => {
  return (
    <div className='chart-table'>
      <Flex
        justify='space-between'
        align='center'
        className='chart-table-title'
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          Quick Summary
        </Typography.Title>
        <Segmented
          options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        />
      </Flex>
      <SimpleBarChart />
    </div>
  );
};

export default ChartTable;
