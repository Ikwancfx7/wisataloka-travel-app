import { Link } from "react-router-dom";
// import { logoutUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
import NavProfile from "../components/NavProfile"

const Navbar = ({isLandingPage}) => {
    const { token, loading } = useAuth();

    return (
        <div className={`flex flex-row justify-between items-center w-full px-7 md:px-13 lg:px-15 py-2 ${isLandingPage ? "absolute text-white":"bg-white text-black shadow"}`}>
            <div>
                <Link to="/" className="text-3xl">
                    WISTALOKA
                </Link>
            </div>
            <div className="flex flex-row gap-5 items-center">
                <Link to="/activities" className="button-nav">
                    Explore
                </Link>
                <Link to="/cart" className="button-nav">
                    Cart
                </Link>
                <Link to="/transactions" className="button-nav">
                    Transactions
                </Link>
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

    )
};

export default Navbar
