import { useEffect, useState } from "react";
import { getActivities } from "../../api/ActivityApi";
import { delDeleteActivity } from "../../api/ActivityApi";
import { toast } from "react-toastify";
import CreateActivity from "./CreateActivity";
import UpdateActivity from "./UpdateActivity";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editActivity, setEditActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [activities, search]);

  const fetchActivities = async () => {
    try {
      const res = await getActivities();
      setActivities(res);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus aktivitas ini?");
    if (!confirm) return;

    try {
      await delDeleteActivity(id);
      toast.success("Aktivitas berhasil dihapus");
      fetchActivities(); // Refresh list setelah delete
    } catch (err) {
      toast.error("Gagal menghapus aktivitas");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-5 w-full">
        <h1 className="text-2xl font-bold md:w-1/2">Manage Activities</h1>
        <div className="flex flex-row justify-between md:justify-end w-full md:w-1/2 gap-2 text-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by promo name..."
            className="border p-1 md:px-4 md:py-2 rounded-lg w-64"
          />
          <button
            onClick={() => setShowCreate(true)}
              
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer"
          >
            <p className="hidden lg:block">+ Create New Activity</p>
            <p className="block lg:hidden">+ Add</p>
          </button>
        </div>
      </div>

      {showCreate && <CreateActivity onClose={() => {
        setShowCreate(false);
        fetchActivities();
      }} />}

      {editActivity && <UpdateActivity activity={editActivity} onClose={() => {
        setEditActivity(null);
        fetchActivities();
      }} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="p-4 rounded-lg shadow-sm/40 space-y-2">
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

            <div className="flex justify-between mt-2">
              <button
                onClick={() => setEditActivity(activity)}
                className="button-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
                className="button-delete"
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
