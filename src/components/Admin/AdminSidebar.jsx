import { Link, useNavigate } from "react-router-dom";
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

  return (
    <aside className="w-64 bg-white shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/admin" className="hover:underline">Dashboard</Link>
        <Link to="/admin/activities" className="hover:underline">Manage Activities</Link>
        <Link to="/admin/users" className="hover:underline">Manage Users</Link>
        <button onClick={handleLogout} className="hover:cursor-pointer bg-red-200 rounded-lg">Logout</button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
