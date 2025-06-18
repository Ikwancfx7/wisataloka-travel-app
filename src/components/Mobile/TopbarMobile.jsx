import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useState } from "react";

const TopbarMobile = ({isLandingPage}) => {
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
        <div className={`${navBarClasses} z-50 transition-all duration-300 ease-in-out flex flex-row justify-between items-center w-full px-6 py-2`}>
            <div className="flex flex-row justify-between items-center w-full ">
                <Link to="/" className="text-3xl">
                        {/* {isLandingPage && !isScrolled ? (
                            <img src="/images/Wisataloka-white.png" alt="logo wisataloka" 
                                className="w-35"
                            />
                        ):(
                            <img src="/images/Wisataloka-blue.png" alt="logo wisataloka" 
                                className="w-35"
                            />
                        )} */}
                        <img 
                            src={isLandingPage?(!isScrolled ? "/images/Wisataloka-white.png":"/images/Wisataloka-blue.png") : "/images/Wisataloka-blue.png"} 
                            alt="Logo Wisataloka"
                            className="w-35" 
                        
                        />
                    </Link>
            </div>
            
            <Link to="/cart" className="relative flex flex-col items-center text-xs">
                <img src={isLandingPage? (!isScrolled ? "/images/shopping-cart_white.png" : "/images/shopping-cart.png") : "/images/shopping-cart.png"} alt="Cart" className="w-8 h-8" />
                {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {totalQuantity}
                </span>
                )}
            </Link>
        </div>
    )
}

export default TopbarMobile;