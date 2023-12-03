import { Box, Flex, SegmentedControl, Text } from '@mantine/core';
import SimpleBarChart from './SimpleBarChart';
import './style.scss';

const ChartTable = () => {
  return (
    <Box m={20}>
      <Flex
        align='center'
        justify='space-between'
        className='chart-table-title'
      >
        <Text size='md'>Quick Summary</Text>
        <SegmentedControl data={['React', 'Angular', 'Vue']} />
      </Flex>
      <SimpleBarChart />
    </Box>
  );
};

export default ChartTable;
