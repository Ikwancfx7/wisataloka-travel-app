import { useState, useEffect } from "react";
import { getBanners } from "../api/BannerApi";
import RegisterForm from "../components/RegisterForm";
import RegisterFormMobile from "../components/Mobile/RegisterFormMobile";
const RegisterPage = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

  return (
    <div className="w-full h-screen flex justify-center md:items-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-10">
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.imageUrl}
              alt={banner.name}
              className={`
                absolute hidden md:flex inset-0 w-full h-full rounded-xl object-cover
                transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/BGLanding.jpg";
              }}
            />
          ))}
          <div className="absolute hidden md:flex inset-0 w-full h-full z-10 bg-black/60"></div>
          <div className="hidden md:flex items-center h-screen">
            <RegisterForm />
          </div>
          <div className="md:hidden">
            <RegisterFormMobile />
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterPage;
