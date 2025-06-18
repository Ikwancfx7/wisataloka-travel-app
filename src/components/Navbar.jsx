import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
import NavProfile from "../components/NavProfile";
import { useCart } from "../contexts/CartContext";

const Navbar = ({isLandingPage}) => {
    const { token, loading } = useAuth();
    const { totalQuantity } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navBarClasses = isLandingPage && !isScrolled
        ? "absolute text-white bg-transparent"
        : "fixed top-0 left-0 right-0 bg-white text-black shadow";

    return (
        <div className={`${navBarClasses} z-50 transition-all duration-300 w-full`}>
            <div className="bg-white/80 z-10 w-full"></div>
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12 py-3">
                <div>
                    <Link to="/" className="text-3xl">
                        {isLandingPage && !isScrolled ? (
                            <img src="/images/Wisataloka-white.png" alt="logo wisataloka" 
                                className="w-24 md:w-40"
                            />
                        ):(
                            <img src="/images/Wisataloka-blue.png" alt="logo wisataloka" 
                                className="w-24 md:w-40"
                            />
                        )}
                    </Link>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <Link to="/activities" className="button-nav">
                        Explore
                    </Link>
                    <Link to="/promo" className="button-nav">
                        Promos
                    </Link>
                    <Link to="/transactions" className="button-nav">
                        Transactions
                    </Link>
                        {/* 🎯 Cart Icon + Badge */}
                    <div className="button-nav">
                        <Link to="/cart" className="relative">
                            <img src={isLandingPage? (!isScrolled ? "/images/shopping-cart_white.png" : "/images/shopping-cart.png") : "/images/shopping-cart.png"} alt="Icon Cart" className="w-6 h-7" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </div>
                    {!token && !loading && (
                        <div className="flex flex-row gap-1">
                            <Link 
                                to="/login"
                                className="flex justify-center items-center bg-gray-100/10 hover:border rounded-xl py-2 w-20 h-10"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register"
                                className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white rounded-xl w-20 py-2"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                    {token && !loading && (
                        <div className="flex flex-row gap-1">
                            <NavProfile />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
};

export default Navbar
