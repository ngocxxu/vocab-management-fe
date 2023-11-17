import { Avatar, Badge, Button, Flex } from 'antd';
import './style.scss';
import Title from 'antd/es/typography/Title';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';

const HeaderTop = () => {
  return (
    <div className='header-top'>
      <Flex className='header-top-inner' justify='space-between' align='center'>
        <Flex justify='center' align='center'>
          <Title className='header-top-title' level={4}>
            VOCAB
          </Title>
        </Flex>
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
