import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import DropDownCustom from '../dropdown';
import classes from './button.module.css';
import Avatar from '../avatar';

const list = [
  {
    icon: <IconUser size='1rem' />,
    body: 'Profile',
  },
  {
    icon: <IconSettings size='1rem' />,
    body: 'Settings',
  },
  {
    icon: <IconLogout size='1rem' className={classes.iconLogout} />,
    body: 'Logout',
  },
];

// const MenuItem = () => {
//   return (
//     <ul className='shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
//       {items.map(({ icon, title }) => {
//         return (
//           <li key={title}>
//             <a className={title === 'Logout' ? 'text-red-500' : ''}>
//               {icon}
//               {title}
//             </a>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

const UserButton = () => {
  return (
    <DropDownCustom
      label='Menu'
      head={
        <div className='flex justify-center items-center gap-2'>
          <Avatar>R</Avatar>
          <p className='font-semibold'>Ranie</p>
        </div>
      }
      list={list}
    />
  );
};

export default UserButton;
