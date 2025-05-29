import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <Outlet />
        {/* <div className="w-full bg-white p-6 rounded-lg shadow-md/60">
        </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;
