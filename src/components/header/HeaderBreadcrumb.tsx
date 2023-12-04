import { Container, Text } from '@mantine/core';
import './style.scss';

const HeaderBreadcrumb = () => {
  return (
    <div className='header-breadcrumb'>
      <Container size='xl' mb={20} py={10}>
        <Text c='#fff' size='md'>
          DASHBOARD DETAIL
        </Text>
        <Text className=''>Back</Text>
      </Container>
    </div>
  );
};

export default HeaderBreadcrumb;
