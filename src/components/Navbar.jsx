import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavProfile from "../components/NavProfile";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart } from "lucide-react"; 

const Navbar = ({isLandingPage}) => {
    const { token, loading } = useAuth();
    const { totalQuantity } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    const { pathname } = useLocation();
    const isActive = (path) => pathname.startsWith(path);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navBarClasses = isLandingPage && !isScrolled
        ? "absolute text-white bg-transparent"
        : "fixed top-0 left-0 right-0 bg-white text-black shadow";

    return (
        <div className={`${navBarClasses} z-50 transition-all duration-300 eaese-in-out w-full`}>
            <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
                <div>
                    <Link to="/" className="text-3xl">
                        {isLandingPage && !isScrolled ? (
                            <img src="/images/Wisataloka-white.png" alt="logo wisataloka" 
                                className="w-50"
                            />
                        ):(
                            <img src="/images/Wisataloka-blue.png" alt="logo wisataloka" 
                                className="w-50"
                            />
                        )}
                    </Link>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <Link to="/activities" className={`button-nav ${isActive("/activities") && " font-semibold text-blue-700"}`}>
                        Explore
                    </Link>
                    <Link to="/promo" className={`button-nav ${isActive("/promo") && "font-semibold text-blue-700"}`}>
                        Promos
                    </Link>
                    <Link to="/transactions" className={`button-nav ${isActive("/transactions") && "font-semibold text-blue-700"}`}>
                        Transactions
                    </Link>
                        {/* 🎯 Cart Icon + Badge */}
                    <div className="button-nav">
                        <Link to="/cart" className="relative">
                            <ShoppingCart className={`w-6 h-7 ${isLandingPage? (!isScrolled ? "text-white" : "text-black") : `text-black ${isActive("/cart") && "text-blue-700"}`}`}/>
                            {/* <img src={isLandingPage? (!isScrolled ? "/images/shopping-cart_white.png" : "/images/shopping-cart.png") : "/images/shopping-cart.png"} alt="Icon Cart" className="w-6 h-7" /> */}
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
                                className={`flex justify-center items-center ${isLandingPage && !isScrolled ? "hover:bg-black/20 text-white" : "bg-green-50 text-black hover:bg-green-100"}  border-1 border-gray-400 rounded-xl py-2 w-20 h-10 transition-all duration-300 ease-in-out`}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register"
                                className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white rounded-xl w-20 py-2 transition-all duration-300 ease-in-out"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                    {token && !loading && (
                        <div className="flex flex-row gap-1">
                            <NavProfile isLandingPage={isLandingPage} isScrolled={isScrolled}/>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
};

export default Navbar