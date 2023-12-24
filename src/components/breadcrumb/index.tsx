import React from 'react';
import './style.scss';
import { Anchor, Breadcrumbs } from '@mantine/core';

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
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const BreadcrumbCustom: React.FC = () => (
  <Breadcrumbs className='breadcrumb' separator='>'>
    {items}
  </Breadcrumbs>
);

export default BreadcrumbCustom;
