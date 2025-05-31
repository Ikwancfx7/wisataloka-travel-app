import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import { useCart } from "../contexts/CartContext";

const ActivityDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
    
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

  const imageUrl =
    activity.imageUrls && activity.imageUrls.length > 0 && activity.imageUrls[0]
      ? activity.imageUrls[0]
      : "/images/default-activity.jpg";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={imageUrl}
        alt={activity.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
        onError={(e) => {
          e.target.onerror = null; // cegah infinite loop
          e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
        }}
      />
      <h1 className="text-3xl font-bold mb-4">{activity.name}</h1>
      <p className="text-gray-700 mb-6">{activity.description}</p>
      <p className="text-lg font-semibold mb-4">Harga: Rp {activity.price}</p>

      <button
        onClick={() => addToCart(activity)}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
      >
        Tambahkan ke Keranjang
      </button>
    </div>
  );
};

export default ActivityDetail;
