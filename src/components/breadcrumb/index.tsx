import React from 'react';
import './style.scss';

const items = [
  {
    title: 'Home',
  },
  {
    title: 'Application Center',
    href: '',
  },
  {
    title: 'Application List',
    href: '',
  },
  {
    title: 'An Application',
  },
].map((item, index) => (
  <a href={item.href} key={index}>
    {item.title}
  </a>
));

const BreadcrumbCustom: React.FC = () => (
  <div className='text-sm breadcrumbs'>
    <ul>{items}</ul>
  </div>
);

export default BreadcrumbCustom;
