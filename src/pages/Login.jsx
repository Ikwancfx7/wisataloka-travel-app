// src/pages/LoginPage.jsx
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useEffect } from "react";
import { GetBanners } from "../api/BannerApi";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  // console.log("API KEY:", import.meta.env.VITE_API_KEY);
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await GetBanners();
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
      <div className="w-full max-w-screen-2xl h-full">
        <div className="w-full h-full hidden md:block relative">
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.imageUrl}
              alt={banner.name}
              className={`
                absolute inset-0 w-full h-full rounded-xl object-cover
                transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/BGLanding.jpg";
              }}
            />
          ))}

          <div className="absolute inset-0 w-full h-full z-10 bg-black/60"></div>

          <div className="absolute z-20 flex flex-col justify-center items-center w-[500px] h-[400px] bg-white p-6 rounded-xl shadow-md/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoginForm setMessage={setMessage}/>
            {/* <p className="mt-4">Message</p> */}
            {message &&  (
              <div className='mt-4'>
                    <p className={`text-center ${message === 'Login success' ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                </div>
            )}
          </div>
        </div>

        <div className="px-5 md:px-0 w-full flex md:hidden justify-center items-center h-screen">
          <div className="flex flex-col justify-center items-center w-[400px] bg-white p-6 rounded-xl shadow-md/20">
            <LoginForm setMessage={setMessage}/>
            {/* <p className="mt-4">Message</p> */}
            {message &&  (
              <div className='mt-4'>
                    <p className={`text-center ${message === 'Login success' ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
