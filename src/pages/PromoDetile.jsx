import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPromoById } from "../api/PromoApi";
import { toast } from "react-toastify";
import Breadcrumb from "../components/BreadCrump";

const PromoDetile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    const fetchPromoDetile = async () => {
      try {
        const res = await getPromoById(id);
        setPromo(res);
      } catch (error) {
        console.error("Gagal memuat detail promo:", error);
      }
    };

    fetchPromoDetile();
  }, [id]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promo.promo_code)
      .then(() => toast.success("Kode promo disalin!", { autoClose: 1000 }))
      .catch(() => toast.error("Gagal menyalin kode.", { autoClose: 1000 }));
  };

  const handleUsePromo = () => {
    // Misalnya redirect ke halaman cart dengan kode promo
    navigate("/cart", { 
        state: { 
            promoId: promo.id,
            promoCode: promo.promo_code 
        } 
    });
  };

  if (!promo) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <div className="hidden md:block pt-25 px-20">
        <Breadcrumb />
      </div>
      <div className="max-w-3xl mx-auto min-h-screen px-6 py-25 md:py-0 pb-25 md:pb-20 ">
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{promo.title}</h1>
        <p className="text-gray-600 mb-4">{promo.description}</p>
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-blue-600 font-semibold">Kode Promo: {promo.promo_code}</p>
          <p className="text-green-600">
            Diskon: Rp {promo.promo_discount_price.toLocaleString("id-ID")}
          </p>
          <p className="text-red-600">Minimum Payment: Rp {promo.minimum_claim_price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCopyCode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Salin Kode
          </button>
          <button
            onClick={handleUsePromo}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Gunakan Promo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoDetile;
