import { Link } from "react-router-dom";
import ProfilePicture from "../../api/ProfilePictureApi";

const FootbarMobile = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden flex justify-around py-2">
            <Link to="/activities" className="flex flex-col items-center text-xs">
                <img src="/icons/explore.png" alt="Explore" className="w-6 h-6" />
                Explore
            </Link>
            <Link to="/promo" className="flex flex-col items-center text-xs">
                <img src="/icons/promoIcon.png" alt="Promo" className="w-6 h-6" />
                Promo
            </Link>
            <Link to="/transactions" className="flex flex-col items-center text-xs">
                <img src="/icons/transaction.png" alt="Transactions" className="w-6 h-6" />
                Transaksi
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