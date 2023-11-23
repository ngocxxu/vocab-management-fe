import { Text } from '@mantine/core';
import './style.scss';

const HeaderBreadcrumb = () => {
  return (
    <div className='header-breadcrumb'>
      <Text c='#fff' size='md'>
        DASHBOARD DETAIL
      </Text>
      {/* <p className='header-breadcrumb-text'>Back</p> */}
    </div>
  );
};

export default HeaderBreadcrumb;
