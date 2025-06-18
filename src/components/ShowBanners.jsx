import { useState, useEffect } from "react";
import { GetBanners } from "../api/BannerApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShowBanners = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try{
                const data = await GetBanners();
                setBanners(data);
                console.log(data);
            }catch(error){
                console.error(error);
            }
        }
        fetchBanners();
    },[]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [banners]);

    useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    
    return () => clearInterval(timer);
    }, [currentIndex, banners]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    if (banners.length === 0) return null;

    return (
        <div className="relative w-full h-full">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute z-0 top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    // style={{ backgroundImage: `url(${banner.imageUrl})` }}
                >
                    <img
                        src={banner.imageUrl}
                        alt={banner.name}
                        className="w-full h-full object-cover"
                        onError={
                            (e) => {
                                e.target.onerror = null; // cegah infinite loop
                                e.target.src = "/images/BGLanding.jpg"; // fallback jika gagal load dari API
                            }
                        }
                    />
                </div>
            ))}

            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
            >
                <ChevronRight size={28}/>
            </button>

            {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Selamat Datang di Wisataloka</h1>
            </div> */}
        </div>
    );
};

export default ShowBanners;