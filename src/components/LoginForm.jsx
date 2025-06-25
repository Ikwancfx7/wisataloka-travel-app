import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import { loginUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import LoadingAnimation from "./LoadingAnimation";

const LoginForm = ({ setMessage }) => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const { login, loading, setLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const fromState = location.state?.from?.pathname;
    const prevPageQuery = searchParams.get("prevPage");
    const from = fromState || prevPageQuery || "/";

    const buttonValid = () => {
            const isValid = email.trim() !== '' && password.trim() !== '';
            setValid(isValid);  
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token); // simpan token
            console.log("Response dari API register:", data);
            login(data.token, data.data);
            setMessage("Login success");

            setTimeout(() => {
                setLoading(false);
                // navigate('/');
                if (data.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate(from, { replace: true }); // redirect kembali ke halaman terakhir
                    window.location.reload();
                }
            }, 2000);
        } catch (error) {
            const message = (error.message || "Login Failed");
            setMessage(message);
            setLoading(false);
        }
    };

    useEffect(() => {
            buttonValid();
        }, [email, password]);

    return (
        <form onSubmit={handleSubmit} className="w-full p-1">
            <h2 className="flex justify-center text-xl font-semibold mb-4">Welcome back!</h2>
            <div>
                <div>
                    <p>Email <span className='text-red-600'>*</span></p>
                </div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border px-5 py-2 rounded-full mb-3 focus:outline-none"
                    required
                />
            </div>
            <div>
                <div>
                    <p>Password <span className='text-red-600'>*</span></p>
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border px-5 py-2 rounded-full mb-3 focus:outline-none"
                        required
                    />
                    <div
                        className="absolute right-3 top-3 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={loading || !valid}
                className={`w-full bg-blue-500 text-white p-2 mt-4 rounded-full ${valid ? 'hover:bg-blue-600 hover:cursor-pointer transition duration-300 ease-in-out':'pointer-events-none opacity-50'}`}
                >
                {loading ? (
                    <div className='flex flex-row justify-center items-center'>
                        <div>
                            <LoadingAnimation/>
                        </div>
                        <div>Login</div>
                    </div>
                ):(
                    <div>Login</div>
                )}
            </button>
            <div className="flex flex-row items-center mt-4 gap-1">
                <p>Don't have an account?</p>
                <Link to="/register" className="text-blue-600">Register</Link>
            </div>
        </form>
    )
}

export default LoginForm;