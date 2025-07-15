import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getloggedUser } from "../api/ProfileApi";
import { useAuth } from "../contexts/AuthContext";
import { ChevronDown } from "lucide-react";

const NavbarProfile = ({isLandingPage, isScrolled}) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getloggedUser();
        setUser(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
      try {  
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

  const textColorClass = isLandingPage ? (isScrolled ? "text-black" : "text-white") : "text-black";

  return (
    <div className="relative w-10 md:w-50" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex flex-row items-center gap-1 cursor-pointer ring-blue-500 w-full"
      >
        <div className="flex items-center justify-center w-full md:w-[40%] h-full">
          {user?.profilePictureUrl ? (
            <img
              src={user.profilePictureUrl}
              alt="Profile"
              className="aspect-square w-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-white">
              {user?.name?.[0] || "P"}
            </div>
          )}
        </div>
        <div className={`hidden md:flex flex-col text-[12px] overflow-hidden transition duration-300 ease-in-out ${textColorClass}`}>
          <p className="text-start font-bold line-clamp-1">{user?.name}</p>
          <p className="text-start line-clamp-1">{user?.email}</p>
        </div>
        <ChevronDown className="hidden md:block w-6 h-6" />
      </button>

      <div className={`
          absolute bg-white left-0 right-0 mt-2 w-full shadow-md rounded-md z-10 py-2 max-w-xs mx-auto md:left-auto md:right-0 origin-top md:origin-top-right transition transform duration-200 ease-out
          ${showDropdown
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-85 -translate-y-2 pointer-events-none"}
        `}>
        <Link
          to={user?.role === "user" ? "/profile" : "/admin/profile"}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setShowDropdown(false)}
        >
          Edit Profile
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarProfile;
