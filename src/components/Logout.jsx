import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            logout();
            navigate("/");
        } catch (error) {
            console.error("Logout gagal:", error);
        }
    }

    return (
        <button onClick={handleLogout} className="ring-2 ring-red-200 py-2 px-4 w-full rounded-2xl">
            Logout
        </button>
    )
}

export default LogoutBtn;