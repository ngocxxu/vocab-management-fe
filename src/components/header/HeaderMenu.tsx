import {
  IconHistory,
  IconHome,
  IconMedal2,
  IconVocabulary,
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
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' />
          {/* hamburger icon */}
          <svg
            className='swap-off fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>

          {/* close icon */}
          <svg
            className='swap-on fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
          </svg>
        </label>
      </div>
    </div>
  );
}
