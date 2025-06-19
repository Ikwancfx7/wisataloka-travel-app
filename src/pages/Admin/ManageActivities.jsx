import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import { DelDeleteActivity } from "../../api/ActivityApi";
import { toast } from "react-toastify";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/activities");
      setActivities(res.data.data);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus aktivitas ini?");
    if (!confirm) return;

    try {
      await DelDeleteActivity(id);
      toast.success("Aktivitas berhasil dihapus");
      fetchActivities(); // Refresh list setelah delete
    } catch (err) {
      toast.error("Gagal menghapus aktivitas");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Activities</h1>
        <button
          onClick={() => navigate("/admin/create-activity")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          + Create New Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border p-4 rounded shadow space-y-2">
            <img
              src={activity.imageUrls?.[0] || "/images/default-activity.jpg"}
              alt={activity.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{activity.title}</h2>
            <p className="text-sm text-gray-600">{activity.city}, {activity.province}</p>
            <p className="font-medium text-green-700">
              Rp{activity.price.toLocaleString()}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/admin/update-activity/${activity.id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageActivities;
