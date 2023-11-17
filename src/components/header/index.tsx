import HeaderBot from './HeaderBot';
import HeaderTop from './HeaderTop';
import './style.scss';

const Header = () => {
  return (
    <div className='header'>
      <HeaderTop />
      <HeaderBot />
    </div>
  );
};

export default Header;
