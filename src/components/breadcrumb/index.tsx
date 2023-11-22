import React from 'react';
import { Breadcrumb } from 'antd';
import './style.scss';

const BreadcrumbCustom: React.FC = () => (
  <Breadcrumb
    className='breadcrumb'
    separator='>'
    items={[
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
    ]}
  />
);

export default BreadcrumbCustom;
