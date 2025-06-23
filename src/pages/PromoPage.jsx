import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPromos } from "../api/PromoApi";
import Breadcrumb from "../components/BreadCrump";

const PromoPage = () => {
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
        <div>
            <div className="hidden md:block pt-25 px-20">
                <Breadcrumb />
            </div>
            <div className="max-w-screen-2xl mx-auto py-20 md:py-0 md:pb-20 px-6 md:px-25 w-full">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-6">Special Promos</h2>
                <div className="flex justify-center w-full">
                    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 w-full md:max-w-screen-lg">
                        {promos.map((promo) => (
                        <Link to={`/promo/${promo.id}`} key={promo.id} 
                            className="flex flex-row md:flex-col p-2 bg-white rounded-3xl md:rounded-xl shadow-lg overflow-hidden hover:shadow-lg/50 transition duration-300 ease-in-out">
                            <img 
                                src={promo.imageUrl} 
                                alt={promo.title}
                                className="h-40 w-40 md:h-48 md:w-full object-cover rounded-3xl md:rounded-xl"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{promo.title}</h3>
                                <p className="text-sm mt-2 line-clamp-2">{promo.description}</p>
                                <p className="text-sm mt-2 text-gray-500">
                                    🎁 Diskon: Rp {promo.promo_discount_price.toLocaleString("id-ID")}
                                </p>
                                <p className="text-sm text-gray-500">Kode: {promo.promo_code}</p>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoPage;