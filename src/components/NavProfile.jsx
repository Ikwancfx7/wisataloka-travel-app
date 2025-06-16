import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../contexts/AuthContext";

const NavbarProfile = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Ambil info user dari API atau localStorage
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/user");
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
      try {
      // await logoutUser();     
      logout();
      navigate("/");
      window.location.reload();
      } catch (error) {
      console.error("Logout gagal:", error);
      }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar (toggle dropdown) */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full overflow-hidden border hover:ring-2 hover:cursor-pointer ring-blue-500"
      >
        {user?.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-sm text-white">
            {user?.name?.[0] || "P"}
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10 py-2">
          <Link
            to={user?.role === "user" ? "/profile" : "/admin/profile"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowDropdown(false)}
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarProfile;
