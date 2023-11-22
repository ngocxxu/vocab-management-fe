import HeaderBot from './HeaderBot';
import HeaderBreadcrumb from './HeaderBreadcrumb';
import HeaderTop from './HeaderTop';
import './style.scss';

const Header = () => {
  return (
    <div className='header'>
      <HeaderTop />
      <HeaderBot />
      <HeaderBreadcrumb />
    </div>
  );
};

export default Header;
