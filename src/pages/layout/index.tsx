import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import "./style.scss";
import Header from "../../components/header";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
