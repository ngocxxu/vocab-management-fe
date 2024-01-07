import {
  IconHistory,
  IconHome,
  IconMedal2,
  IconMenu2,
  IconVocabulary,
  IconX,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  {
    link: '/vocab',
    label: 'Vocabulary',
    icon: IconVocabulary,
    // links: [
    //   { link: '/docs', label: 'Documentation' },
    //   { link: '/resources', label: 'Resources' },
    //   { link: '/community', label: 'Community' },
    //   { link: '/blog', label: 'Blog' },
    // ],
  },
  { link: '/vocab-trainer', label: 'Vocab Trainer', icon: IconMedal2 },
  { link: '/history', label: 'History', icon: IconHistory },
];

export function HeaderMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const transformedPath = pathname.split('/').slice(0, 2).join('/');

  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        onClick={(event) => {
          event.preventDefault();
          navigate(`${link.link}`);
        }}
      >
        <div
          className={clsx(
            'flex justify-center items-center gap-2 h-11 hover:text-purple-700',
            {
              'text-purple-700': transformedPath === link.link,
            }
          )}
        >
          <link.icon size={18} />
          {link.label}
        </div>
      </a>
    );
  });

  return (
    <div className='container mx-auto'>
      <div className='flex'>
        <div className='flex justify-start items-center gap-8 sm:visible invisible '>
          {items}
        </div>

        <label className='btn btn-circle swap swap-rotate visible sm:invisible'>
          <input type='checkbox' />
          <IconMenu2 className='swap-off fill-current' width='32' height='32' />
          <IconX className='swap-on fill-current' width='32' height='32' />
        </label>
      </div>
    </div>
  );
}
