import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex flex-col">
      <div className={`w-full z-20 ${isLandingPage ? "absolute top-0 left-0" : "relative"}`}>
        <Navbar isLandingPage={isLandingPage} />
      </div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
