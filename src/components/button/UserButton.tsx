import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import DropDownCustom from '../dropdown';
import classes from './button.module.css';

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

const MenuItem = () => {
  return (
    <ul className='shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
      {items.map(({ icon, title }) => {
        return (
          <li>
            <a className={title === 'Logout' ? 'text-red-500' : ''}>
              {icon}
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const UserButton = () => {
  return (
    <ul className='menu menu-horizontal'>
      <li>
        <DropDownCustom
          head={
            <div className='flex justify-center items-center gap-2'>
              <div className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  />
                </div>
              </div>
              <p className='text-white font-semibold'>Hanuel</p>
            </div>
          }
          list={<MenuItem />}
        />
      </li>
    </ul>
  );
};

export default UserButton;
