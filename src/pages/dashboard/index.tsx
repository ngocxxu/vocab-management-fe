import ChartTable from '../../components/charts';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { toggle } = useSelector((state: RootState) => state.dashboardReducer);

  return (
    <div className='container mx-auto'>
      <div className='shadow-md'>
        <ChartTable />
        {/* <Button type='primary'>{!toggle && 'hi'}</Button> */}
      </div>
    </div>
  );
};

export default Dashboard;
