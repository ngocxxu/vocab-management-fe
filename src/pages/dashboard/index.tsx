import { Container, Paper } from '@mantine/core';
import ChartTable from '../../components/charts';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { toggle } = useSelector((state: RootState) => state.dashboardReducer);

  return (
    <Container size='xl'>
      <Paper shadow='sm' withBorder>
        <ChartTable />
        {/* <Button type='primary'>{!toggle && 'hi'}</Button> */}
      </Paper>
    </Container>
  );
};

export default Dashboard;
