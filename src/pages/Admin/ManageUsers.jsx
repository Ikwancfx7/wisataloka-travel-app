import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/v1/all-user');
      setUsers(response.data.data);
      setError(null);
    } catch (error) {
      setError("Gagal memuat data user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

//   const profileUrl = users?.profilePictureUrl?.[0] || "/images/default-profile.jpg";

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map(user => {
            const profileUrl = user.profilePictureUrl || "/images/default-profile.jpg";
            return (
                <div
                key={user.id}
                className="flex items-center gap-4 p-4 border rounded shadow-sm hover:shadow-md transition"
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
            )
            })}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
