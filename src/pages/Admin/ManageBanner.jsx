// src/pages/admin/ManageBanner.jsx
import { useEffect, useState } from "react";
import { GetBanners, DelDeleteBanner } from "../../api/BannerApi";
import CreateBanner from "./CreateBanner";
import UpdateBanner from "./UpdateBanner";

const ManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [search, setSearch] = useState("");

  const fetchBanners = async () => {
    const data = await GetBanners();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    await DelDeleteBanner(id);
    fetchBanners();
  };

  const filteredBanners = banners.filter((banner) =>
    banner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Banners</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by banner name..."
            className="border px-4 py-2 rounded-lg w-64"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={() => setShowCreate(true)}
          >
            + Create Banner
          </button>

        </div>
      </div>

      {showCreate && <CreateBanner onClose={() => {
        setShowCreate(false);
        fetchBanners();
      }} />}

      {editBanner && <UpdateBanner banner={editBanner} onClose={() => {
        setEditBanner(null);
        fetchBanners();
      }} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBanners.map((banner) => (
          <div key={banner.id} className="border rounded shadow p-4 space-y-2">
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{banner.name}</h2>
            <div className="flex justify-between">
              <button
                className="text-yellow-600 hover:underline"
                onClick={() => setEditBanner(banner)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(banner.id)}
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

export default ManageBanner;
