import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/footer';
import './style.scss';
import Header from '../../components/header';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath !== '/vocab-trainer/examination') {
      localStorage.removeItem('questions');
    }
  }, [location.pathname]);

  return (
    <>
      <div className='layout'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
