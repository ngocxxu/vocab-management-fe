import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Flex } from 'antd';
import './style.scss';

const HeaderTop = () => {
  return (
    <div className='header-top'>
      <Flex className='header-top-inner' justify='space-between' align='center'>
        <p className='header-top-inner-title'>VOCAB</p>
        <Flex gap={20} justify='center' align='center'>
          <Button
            shape='circle'
            icon={
              <Badge size='small' count={5}>
                <BellOutlined />
              </Badge>
            }
          />
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
            U
          </Avatar>
          <Button shape='circle' icon={<SettingOutlined />} />
        </Flex>
      </Flex>
    </div>
  );
};

export default HeaderTop;
