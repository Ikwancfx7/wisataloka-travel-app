import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FootbarMobile from "../components/Mobile/FootbarMobile";
import TopbarMobile from "../components/Mobile/TopbarMobile";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">

      <div className={`w-full z-30 ${isLandingPage ? "absolute top-0 left-0" : "sticky top-0"} hidden md:flex`}>
        <Navbar isLandingPage={isLandingPage} />
      </div>
      
      <div className="w-full md:hidden">
        <div className={`w-full z-30 md:hidden ${isLandingPage ? "absolute top-0 left-0" : "sticky top-0"}`}>
          <TopbarMobile isLandingPage={isLandingPage} />
        </div>
        <FootbarMobile />
      </div>
      
      <main className="flex-grow w-full pb-20">
        <Outlet />
      </main>
      
      <div className="w-full hidden md:flex justify-center">
        <div className="w-full max-w-screen-2xl px-4">
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
