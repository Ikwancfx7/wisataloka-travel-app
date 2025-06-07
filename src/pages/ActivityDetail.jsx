import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const ActivityDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
    
  console.log("📦 Token sekarang:", localStorage.getItem("token"));
  console.log("📦 Activity:", activity);
  
  useEffect(() => {
      const fetchActivity = async () => {
        try {
          const response = await axiosInstance.get(`/api/v1/activity/${id}`);
          setActivity(response.data.data);
        } catch (error) {
          console.error("Gagal mengambil detail aktivitas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchActivity();
    }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!activity) return <p className="text-center">Aktivitas tidak ditemukan</p>;

  const imageUrl = activity?.imageUrls?.[0] || "/images/default-activity.jpg";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <img
        src={imageUrl}
        alt={`Gambar ${activity.title}`}
        className="w-full h-64 object-cover rounded-lg mb-6"
        onError={(e) => {
          e.target.onerror = null; // cegah infinite loop
          e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
        }}
      />
      
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
          <p className="text-gray-500 mb-4">
            Kategori: {activity.category?.name}
          </p>
        </div>

        <button
          onClick={() => {
            const token = localStorage.getItem("token");

            if (!token) {
              toast.error("Silakan login terlebih dahulu", { autoClose: 2000 });
              navigate("/login", { state: { from: location } });
              return;
            }
            addToCart(activity); 
            toast.success("Berhasil menambahkan ke keranjang", { autoClose: 1000 });
          }}
          className="bg-blue-100 text-blue-900 border border-blue-900 px-6 py-2 rounded hover:bg-blue-50 hover:cursor-pointer"
        >
          Add to Cart
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
            <p className="text-yellow-500 font-semibold">⭐ {activity.rating}</p>
            <p className="text-gray-500">{activity.total_reviews} ulasan</p>
      </div>

      <p className="text-gray-700 mb-6 text-justify">{activity.description}</p>

      <div className="flex flex-row items-center text-2xl font-semibold gap-1 mb-4 bg-green-100 rounded p-5">
        <p className="text-green-600 text-lg">
          Price:
        </p>
        <p className="font-semibold text-green-600"> Rp {activity.price ? activity.price.toLocaleString("id-ID") : "0"}</p>
        {activity.price_discount && (
          <p className="line-through text-gray-400 ml-2 text-sm md:text-lg">
            Rp {activity.price_discount.toLocaleString("id-ID")}
          </p>
        )}
      </div>

      <p className="text-gray-800 font-medium mb-1 text-lg">Address:</p>
      <p className="text-gray-600 mb-4 text-justify">
        {activity.address}, {activity.city}, {activity.province}
      </p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Fasilities:</h2>
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: activity.facilities }}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Location:</h2>
        <div
          className="rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: activity.location_maps }}
        />
      </div>

      
    </div>
  );
};

export default ActivityDetail;
