import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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

  const { pathname } = useLocation();
  const isActive = (path) => pathname.startsWith(path);

  return (
    <aside className="w-64 bg-white shadow-md p-4 h-full">
      {/* <h2 className="text-xl font-bold mb-4">Admin Panel</h2> */}
      <nav className="flex flex-col">
        <Link to="/admin" className={`px-2 py-2 transition-all duration-300 ease-in-out font-bold`}>Dashboard</Link>
        <Link to="/admin/users" className={`nav-link-admin ${isActive("/admin/users") ? "bg-blue-100" : ""}`}>Manage Users</Link>
        <Link to="/admin/activities" className={`nav-link-admin ${isActive("/admin/activities") ? "bg-blue-100" : ""}`}>Manage Activities</Link>
        <Link to="/admin/transactions" className={`nav-link-admin ${isActive("/admin/transactions") ? "bg-blue-100" : ""}`}>Manage Transactions</Link>
        <Link to="/admin/promos" className={`nav-link-admin ${isActive("/admin/promos") ? "bg-blue-100" : ""}`}>Manage Promos</Link>
        <Link to="/admin/categories" className={`nav-link-admin ${isActive("/admin/categories") ? "bg-blue-100" : ""}`}>Manage Categories</Link>
        <Link to="/admin/banners" className={`nav-link-admin ${isActive("/admin/banners") ? "bg-blue-100" : ""}`}>Manage Banners</Link>

        <button onClick={handleLogout} className="hover:cursor-pointer bg-red-200 rounded-lg mt-10">Logout</button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
