import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

/** gaya link aktif / non‑aktif, sama seperti sidebar desktop */
const navClass = (isActive) =>
  `block text-white px-4 py-2 text-sm rounded-md ${
    isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
  }`;

const AdminNavbarMobile = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  /** tutup menu kalau klik di luar */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {  
      logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout Failed", error);
      }
  }

  return (
    <header className="lg:hidden relative z-50">
      {/* top‑bar */}
      <div className="flex items-center justify-between bg-green-800 text-white p-4 shadow">
        <h2 className="text-lg font-bold">Admin Wisataloka</h2>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle admin menu"
          className="focus:outline-none cursor-pointer"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* dropdown */}
      {open && (
        <nav
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-green-800 shadow-lg"
        >
          <div className="flex flex-col py-4">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Users
            </NavLink>
            <NavLink
              to="/admin/transactions"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Transactions
            </NavLink>
            <NavLink
              to="/admin/activities"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Activities
            </NavLink>
            <NavLink
              to="/admin/promos"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Promos
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Categories
            </NavLink>
            <NavLink
              to="/admin/banners"
              className={({ isActive }) => navClass(isActive)}
              onClick={() => setOpen(false)}
            >
              Manage Banners
            </NavLink>

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 px-4 py-2 mt-2 rounded-md text-white text-sm hover:bg-green-700 cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AdminNavbarMobile;