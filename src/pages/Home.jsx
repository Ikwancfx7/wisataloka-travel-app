import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";

const HomePage = () => {
    const BGLanding = "/images/BGLanding.jpg";
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/promos");
                setPromos(response.data.data);
            } catch (error) {
                console.error("Failed to fetch promos:", error);
            }
        };

        fetchPromos();
    }, []);

    return (
        <>
            <div className="relative flex items-center justify-center h-screen">
                <img src={BGLanding} alt="BGLanding"
                    className="flex relative w-full h-full object-cover" 
                />
                <div className="absolute flex flex-col justify-center gap-10">
                    <h1 className="text-white text-5xl">Welcome to Wisataloka</h1>
                    <Link 
                        to="/activities"
                        className="flex justify-center bg-white text-black px-4 py-2 rounded-2xl"
                    >
                        Explore Now
                    </Link>
                </div>
            </div>
            <div className="py-12 px-6 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-6">Special Promos</h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {promos.map((promo) => (
                    <Link to={`/promo/${promo.id}`} key={promo.id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg/50">
                        <img src={promo.imageUrl} alt={promo.title} className="h-48 w-full object-cover" />
                        <div className="p-4">
                        <h3 className="font-semibold text-xl">{promo.title}</h3>
                        <p className="text-sm mt-2">{promo.description}</p>
                        <p className="text-sm mt-2 text-gray-500">
                            🎁 Diskon: Rp {promo.promo_discount_price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-sm text-gray-500">Kode: {promo.promo_code}</p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;