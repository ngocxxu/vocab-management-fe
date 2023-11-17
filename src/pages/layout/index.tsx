import { Outlet } from 'react-router-dom';
import './style.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Layout = () => {
  return (
    <div className='layout'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
