import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPromos } from "../api/PromoApi";

const Promos = () => {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await getPromos();
                setPromos(response);
            } catch (error) {
                console.error("Failed to fetch promos:", error);
            }
        };

        fetchPromos();
    }, []);

    return (
        <div className="w-full">
            <div>
                <h2 className="text-3xl font-bold text-center mb-6">Special Promos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {promos.slice(0, 4).map((promo) => (
                    <Link to={`/promo/${promo.id}`} key={promo.id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg/50 p-2">
                        <img src={promo.imageUrl} alt={promo.title} className="md:h-48 md:w-full object-cover rounded-2xl" />
                        <div className="p-4">
                        <h3 className="font-semibold text-sm md:text-xl line-clamp-1">{promo.title}</h3>
                        <p className="text-sm mt-2 line-clamp-1">{promo.description}</p>
                        <p className="text-sm mt-2 text-gray-500">
                            🎁 Diskon: Rp {promo.promo_discount_price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-sm text-gray-500">Kode: {promo.promo_code}</p>
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link
                        to="/promo"
                        className="px-9 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition ease-in-out duration-500 font-semibold"
                        >
                        Lihat Semua Promo
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Promos;