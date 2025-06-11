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
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutBtn;