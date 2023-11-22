import ChartTable from '../../components/charts';
import './style.scss';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { toggle } = useSelector((state: RootState) => state.dashboardReducer);

  return (
    <div className='dashboard'>
      <ChartTable />
      {/* <Button type='primary'>{!toggle && 'hi'}</Button> */}
    </div>
  );
};

export default Dashboard;
