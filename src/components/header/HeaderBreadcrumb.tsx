import { Typography } from 'antd';
import './style.scss';

const HeaderBreadcrumb = () => {
  return (
    <div className='header-breadcrumb'>
      <Typography.Title level={5} style={{ margin: 0, color: '#fff' }}>
        DASHBOARD DETAIL
      </Typography.Title>
      {/* <p className='header-breadcrumb-text'>Back</p> */}
    </div>
  );
};

export default HeaderBreadcrumb;
