import { useEffect, useState } from "react";
import { getloggedUser, getAllUsers, postUpdateUserRole } from "../../api/ProfileApi";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response);
      setError(null);
    } catch (error) {
      setError("Gagal memuat data user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await getloggedUser();
      setCurrentUser(res);
    } catch (error) {
      console.error("Gagal mengambil data user saat ini", error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const payload = {
        role: newRole,
      };
      await postUpdateUserRole(userId, payload);
      toast.success("Role berhasil diperbarui!", { autoClose: 1000 });
      getUsers(); // refresh data
    } catch (error) {
      toast.error("Gagal memperbarui role.", { autoClose: 1000 });
      console.error(error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getUsers();
    getCurrentUser();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari nama user/admin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {filteredUsers.map(user => {
            const profileUrl = user.profilePictureUrl || "/images/default-profile.jpg";
            const isSelf = currentUser?.id === user.id;

            return (
                <div className="flex flex-row justify-between items-center border p-4 rounded shadow-sm hover:shadow-md transition">
                  <div
                    key={user.id}
                    className="flex items-center gap-4"
                    >
                    <img
                        src={profileUrl}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-profile.jpg"; // fallback profile picture
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">{user.name}</span>
                        <span className="text-gray-600">{user.email}</span>
                        <span className="text-sm text-gray-500">Role: {user.role}</span>
                        <span className="text-sm text-gray-500">Phone: {user.phoneNumber}</span>
                    </div>
                  </div>
                  {!isSelf && (
                      <button
                        onClick={() => updateUserRole(user.id, user.role === "admin" ? "user" : "admin")}
                        className="w-30 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition hover:cursor-pointer"
                      >
                        Jadikan {user.role === "admin" ? "User" : "Admin"}
                      </button>
                    )}
                </div>
            )
            })}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
