import { Link } from "react-router-dom";
import Promos from "../components/Promos";
import CategoryFilterLanding from "../components/CategoryFilterLanding";
import ShowBanners from "../components/ShowBanners";

const HomePage = () => {
    const BGLanding = "/images/BGLanding.jpg";
    
    return (
        <>
            <div className="relative flex items-center justify-center md:h-[560px] mb-10">
                {/* <img src={BGLanding} alt="BGLanding"
                    className="flex relative w-full h-full object-cover" 
                /> */}
                <ShowBanners />
                <div className="container mx-auto absolute flex justify-center items-center z-10">
                    <div className="absolute flex flex-col items-center gap-5 md:gap-6">
                        <h1 className="text-white text-xl md:text-5xl font-bold">Welcome to Wisataloka</h1>
                        <div className="flex justify-center">
                            <CategoryFilterLanding />
                        </div>
                        {/* <Link 
                            to="/activities"
                            className="flex justify-center bg-white text-black px-4 py-2 rounded-2xl"
                        >
                            Explore Now
                        </Link> */}
                    </div>
                </div>
            </div>

            <Promos />
            
        </>
    );
}

export default HomePage;