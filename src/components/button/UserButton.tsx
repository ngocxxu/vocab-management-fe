import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import DropDownCustom from "../dropdown";
import classes from "./button.module.css";

const list = [
  {
    icon: <IconUser size="1rem" />,
    body: "Profile",
  },
  {
    icon: <IconSettings size="1rem" />,
    body: "Settings",
  },
  {
    icon: <IconLogout size="1rem" className={classes.iconLogout} />,
    body: "Logout",
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
    <ul className="menu menu-horizontal">
      <li>
        <DropDownCustom
          label="Menu"
          head={
            <div className="flex justify-center items-center gap-2">
              <div className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <p className="font-semibold">Haneul</p>
            </div>
          }
          list={list}
        />
      </li>
    </ul>
  );
};

export default UserButton;
