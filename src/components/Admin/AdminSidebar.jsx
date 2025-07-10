import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  }

  const navClass = (isActive) =>
  `nav-link-admin ${isActive ? "bg-blue-100 font-semibold text-black" : ""}`;

  return (
    <aside className="hidden lg:flex flex-col justify-between w-56 bg-green-800 shadow-md text-white h-screen">
      <h2 className="text-xl font-bold py-5 px-3">Admin Wisataloka</h2>
      <nav className="flex flex-col justify-between h-full pb-5 px-5">
        <div className="flex flex-col">
          <NavLink to="/admin" end className={({ isActive }) => navClass(isActive)}>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/admin/transactions"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Transactions
          </NavLink>

          <NavLink
            to="/admin/activities"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Activities
          </NavLink>

          <NavLink
            to="/admin/promos"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Promos
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Categories
          </NavLink>

          <NavLink
            to="/admin/banners"
            className={({ isActive }) => navClass(isActive)}
          >
            Manage Banners
          </NavLink>
        </div>

        <button onClick={handleLogout} className="flex flex-row gap-2 items-center cursor-pointer hover:font-bold rounded-lg mt-10">
            <LogOut className="hover:font-bold" />
            <p>Logout</p>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
