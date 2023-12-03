import HeaderBreadcrumb from './HeaderBreadcrumb';
import { HeaderMenu } from './HeaderMenu';
import HeaderTop from './HeaderTop';
import './style.scss';

const Header = () => {
  return (
    <div className='header'>
      <HeaderTop />
      <HeaderMenu />
      <HeaderBreadcrumb />
    </div>
  );
};

export default Header;
