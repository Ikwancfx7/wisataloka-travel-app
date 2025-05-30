import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
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
        <div className="flex flex-row justify-between items-center px-7 md:px-13 lg:px-15 py-2">
            <div>
                <Link to="/">
                    WISTALOKA
                </Link>
            </div>
            <div className="flex flex-row gap-5 items-center">
                <Link to="/activities">
                    Explore
                </Link>
                <Link to="/cart">
                    Cart
                </Link>
                <Link to="/transactions">
                    Transactions
                </Link>
                {!token && !loading && (
                    <div className="flex flex-row gap-1">
                        <Link 
                            to="/login"
                            className="flex justify-center border rounded-xl py-2 w-20"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register"
                            className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-xl w-20 py-2"
                        >
                            Register
                        </Link>
                    </div>
                )}
                {token && !loading && (
                    <button onClick={handleLogout} className="hover:cursor-pointer">
                        Logout
                    </button>
                )}
            </div>
        </div>

    )
};

export default Navbar
