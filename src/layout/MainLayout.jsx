import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FootbarMobile from "../components/Mobile/FootbarMobile";
import TopbarMobile from "../components/Mobile/TopbarMobile";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex flex-col">
      <div className={`sticky top-0 hidden md:flex w-full z-20 ${isLandingPage ? "absolute top-0 left-0" : "relative"}`}>
        <Navbar isLandingPage={isLandingPage} />
      </div>
      
      <div className="md:hidden">
        <TopbarMobile />
        <FootbarMobile />
      </div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <div className="hidden md:flex">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
