import { useEffect, useState } from "react";
import { getBanners, delDeleteBanner } from "../../api/BannerApi";
import CreateBanner from "./CreateBanner";
import UpdateBanner from "./UpdateBanner";

const ManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [search, setSearch] = useState("");

  const fetchBanners = async () => {
    const data = await getBanners();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    await delDeleteBanner(id);
    fetchBanners();
  };

  const filteredBanners = banners.filter((banner) =>
    banner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4 md:space-y-6 min-h-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Banners</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by banner name..."
            className="border px-4 py-2 rounded-lg w-full sm:w-64"
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
          <div key={banner.id} className="card-container">
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="image-container"
            />
            <div>
              <h2 className="text-lg font-semibold">{banner.name}</h2>
              <div className="button-edit-delete">
                <button
                  className="button-edit"
                  onClick={() => setEditBanner(banner)}
                >
                  Edit
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(banner.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBanner;
