import { Link } from "react-router-dom";
const HomePage = () => {
    const BGLanding = "/images/BGLanding.jpg";
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
        </>
    );
}

export default HomePage;