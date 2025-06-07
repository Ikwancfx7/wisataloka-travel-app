import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Map, DollarSign, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    // Simulasi ambil data (ganti dengan API call asli nanti)
    setTotalUsers(125);
    setTotalActivities(42);
    setTotalTransactions(87);
    setPendingApprovals(5);
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Users" value={totalUsers} icon={<User className="w-5 h-5" />} />
        <StatCard title="Activities" value={totalActivities} icon={<Map className="w-5 h-5" />} />
        <StatCard title="Transactions" value={totalTransactions} icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Pending" value={pendingApprovals} icon={<Clock className="w-5 h-5" />} />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/activities" className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">Kelola Aktivitas</Link>
          <Link to="/admin/users" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Kelola Pengguna</Link>
          <Link to="/admin/profile" className="bg-gray-600 text-white px-4 py-2 rounded-xl shadow hover:bg-gray-700 transition">Edit Profil Admin</Link>
        </div>
      </div>

      {/* Recent Section (optional dummy) */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Aktivitas Terbaru</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>User "Rina" baru saja mendaftar</li>
          <li>Aktivitas "Hiking Gunung Bromo" ditambahkan</li>
          <li>Transaksi dari "Budi" berhasil</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
