import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopbar from "../components/Admin/AdminTopbar";
import AdminNavbarMobile from "../components/Admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Mobile Navigation */}
        <AdminNavbarMobile />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;