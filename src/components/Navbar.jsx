import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
const Navbar = ({isLandingPage}) => {
    const { logout, token, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
        // await logoutUser();     
        logout();
        navigate("/");
        } catch (error) {
        console.error("Logout gagal:", error);
        }
    }

    // if(token && !loading) {
    //     return (
    //         <div className="flex flex-row justify-between">
    //             <div>
    //                 <h1>WISTALOKA</h1>
    //             </div>
    //             <div className="flex flex-row gap-5">
    //                 <Link to="/">
    //                     Home
    //                 </Link>
    //                 <Link to="/cart">
    //                     Cart
    //                 </Link>
    //                 <Link to="/activities">
    //                     Activities
    //                 </Link>
    //                 <button onClick={handleLogout} className="hover:cursor-pointer">
    //                     Logout
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // }

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
                    <button onClick={handleLogout} className="hover:cursor-pointer w-24 hover:text-red-300">
                        Logout
                    </button>
                )}
            </div>
        </div>

    )
};

export default Navbar
