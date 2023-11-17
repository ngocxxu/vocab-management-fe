import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './style.scss';

const Dashboard = () => {
  // const dispatch = useDispatch();
  const { toggle } = useSelector((state: RootState) => state.dashboardReducer);

  return (
    <div className='dashboard'>
      <Button type='primary'>{!toggle && 'hi'}</Button>
    </div>
  );
};

export default Dashboard;
