import { useAuth } from "../../contexts/AuthContext"; 
import NavbarProfile from "../NavProfile";

const AdminTopbar = () => {
    const { user } = useAuth();

  return (
    <header className="flex flex-row items-center justify-between bg-white px-6 py-4 shadow-sm">
      <div className="text-lg font-semibold">
        Welcome, {user.name}
      </div>
      <NavbarProfile />
    </header>
  );
};

export default AdminTopbar;
