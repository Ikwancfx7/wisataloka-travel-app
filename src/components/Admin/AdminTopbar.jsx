import { useAuth } from "../../contexts/AuthContext"; 

const AdminTopbar = () => {
    const { user } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-4 shadow-sm">
      <div className="text-lg font-semibold">
        Welcome, {user?.name || "Admin"}
      </div>
    </header>
  );
};

export default AdminTopbar;
