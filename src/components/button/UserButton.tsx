import {
  Avatar,
  Divider,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { forwardRef } from 'react';
import classes from './button.module.css';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  icon?: React.ReactNode;
}

const items = [
  {
    icon: <IconUser size='1rem' />,
    title: 'Profile',
  },
  {
    icon: <IconSettings size='1rem' />,
    title: 'Settings',
  },
  {
    icon: <IconLogout size='1rem' className={classes.iconLogout} />,
    title: 'Logout',
    color: 'red.8',
  },
];

const UserMenu = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, icon, ...props }: UserButtonProps, ref) => (
    <UnstyledButton ref={ref} {...props}>
      <Group>
        <Avatar src={image} radius='xl' />
        <Text c='gray.5' size='sm'>
          {name}
        </Text>

        {icon || <IconChevronDown className={classes.icon} size='1rem' />}
      </Group>
    </UnstyledButton>
  )
);

const MenuItem = () => {
  return (
    <>
      {items.map(({ icon, title, color }) => {
        return (
          <>
            {title === 'Logout' && <Divider />}
            <Menu.Item
              c={color}
              leftSection={icon}
              component='a'
              href='https://mantine.dev'
              target='_blank'
            >
              {title}
            </Menu.Item>
          </>
        );
      })}
      {/* <Menu.Item
        leftSection={<IconLogout size='1rem' className={classes.iconLogout} />}
        component='a'
        href='https://mantine.dev'
      >
        Mantine website
      </Menu.Item>
      <Divider />
      <Menu.Item
        c='red.8'
        leftSection={<IconLogout size='1rem' className={classes.iconLogout} />}
        component='a'
        href='https://mantine.dev'
        target='_blank'
      >
        Logout
      </Menu.Item> */}
    </>
  );
};

const UserButton = () => {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserMenu
          image='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
          name='Haneul'
        />
      </Menu.Target>
      <Menu.Dropdown>
        <MenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserButton;
