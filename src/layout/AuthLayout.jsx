import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopbarMobile from "../components/Mobile/TopbarMobile";
import FootbarMobile from "../components/Mobile/FootbarMobile";

const AuthLayout = () => {

  return (
    <div>
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div className="md:hidden">
        <TopbarMobile />
      </div>

      <div className="min-h-screen bg-gray-50 pt-20 md:flex md:items-center justify-center">
          <Outlet />
        {/* <div className="w-full bg-white p-6 rounded-lg shadow-md/60">
        </div> */}
      </div>

      <div className="md:hidden">
        <FootbarMobile />
      </div>

    </div>
  );
};

export default AuthLayout;
