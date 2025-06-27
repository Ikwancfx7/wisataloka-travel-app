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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <label className="flex flex-row items-center gap-2 mb-5">
            <p>
              Search: 
            </p>
            <input
              type="text"
              placeholder="Cari nama user/admin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
      {filteredUsers.length === 0 ? (
        <p className="p-5 text-center w-full">No users found.</p>
      ) : (
        <div className="space-y-4">
          <div className="rounded">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => {
                  const isSelf = currentUser?.id === u.id;
                  return (
                    <tr key={u.id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={u.profilePictureUrl || "/images/default-profile.jpg"}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => (e.target.src = "/images/default-profile.jpg")}
                        />
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3">{u.phoneNumber}</td>
                      <td className="p-3 text-center">
                        {!isSelf && (
                          <button
                            onClick={() =>
                              updateUserRole(u.id, u.role === "admin" ? "user" : "admin")
                            }
                            className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Make {u.role === "admin" ? "User" : "Admin"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
