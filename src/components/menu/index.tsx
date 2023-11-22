import {
  FileProtectOutlined,
  GoldOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import '../header/style.scss';

const items: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <HomeOutlined />,
  },
  {
    label: 'Vocabulary',
    key: 'vocab',
    icon: <ReadOutlined />,
  },
  {
    label: 'Vocab Trainer',
    key: 'vocab-trainer',
    icon: <FileProtectOutlined />,
  },
  {
    label: 'History',
    key: 'history',
    icon: <GoldOutlined />,
  },
];

const MenuCustom = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      className='header-bot-menu'
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  );
};

export default MenuCustom;
