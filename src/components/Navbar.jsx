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
        <div className="flex flex-row justify-between px-18 py-2">
            <div>
                <h1>WISTALOKA</h1>
            </div>
            <div className="flex flex-row gap-5">
                <Link to="/">
                    Home
                </Link>
                <Link to="/cart">
                    Cart
                </Link>
                <Link to="/activities">
                    Activities
                </Link>
                {!token && !loading && (
                    <div className="flex flex-row gap-5">
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/register">
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
