import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const TopbarMobile = () => {
    const { totalQuantity } = useCart();
    return (
        <div className="fixed z-50 top-0 left-0 right-0 flex flex-row justify-between items-center w-full px-6 md:px-13 lg:px-15 pt-4 pb-2 bg-white">
            <div className="flex flex-row justify-between items-center w-full ">
                <Link to="/" className="text-2xl font-semibold">
                    <img src="/images/Wisataloka-blue.png" alt="logo wisataloka" />
                </Link>
            </div>
            
            <Link to="/cart" className="relative flex flex-col items-center text-xs">
                <img src="/icons/shopping-cart.png" alt="Cart" className="w-8 h-8" />
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