import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import ProfilePicture from "../../api/ProfilePictureApi";

const FootbarMobile = () => {
    const { totalQuantity } = useCart();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden flex justify-around py-2">
            <Link to="/activities" className="flex flex-col items-center text-xs">
                <img src="/icons/explore.png" alt="Explore" className="w-6 h-6" />
                Explore
            </Link>
            <Link to="/transactions" className="flex flex-col items-center text-xs">
                <img src="/icons/transaction.png" alt="Transactions" className="w-6 h-6" />
                Transaksi
            </Link>
            <Link to="/cart" className="relative flex flex-col items-center text-xs">
                <img src="/icons/shopping-cart.png" alt="Cart" className="w-6 h-6" />
                {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {totalQuantity}
                </span>
                )}
                Cart
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-xs">
                <div className="w-6 h-6">
                    <ProfilePicture />
                </div>
                Akun
            </Link>
        </div>
    )
}

export default FootbarMobile;