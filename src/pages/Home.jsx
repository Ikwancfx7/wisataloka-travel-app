import { Link } from "react-router-dom";
import Promos from "../components/Promos";
import CategoryFilterLanding from "../components/CategoryFilterLanding";
import ShowBanners from "../components/ShowBanners";

const HomePage = () => {    
    return (
        <div>
            <div className="relative w-full h-[360px] md:h-[560px] mb-10 bg-blue-400">
                <div className="absolute inset-0 z-10">
                    <ShowBanners />
                </div>
                <div className="relative w-full h-full flex justify-center items-center">
                    <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center gap-5 md:gap-6 px-4">
                        <h1 className="text-white text-2xl md:text-5xl font-bold text-center z-10">
                            Welcome to Wisataloka
                        </h1>
                        <div className="flex justify-center z-10">
                            <CategoryFilterLanding />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center px-4">
                <div className="w-full max-w-screen-xl">
                    <Promos />
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;