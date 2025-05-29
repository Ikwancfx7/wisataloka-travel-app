import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
const LoginForm = ({ setMessage }) => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);
    const { login, loading, setLoading } = useAuth();

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
            navigate('/');
        }, 2000);
        } catch (error) {
        setErrorMsg(error.message || "Login gagal");
        setMessage(errorMsg);
        setLoading(false);
        }
    };

    useEffect(() => {
            buttonValid();
        }, [email, password]);

    return (
        <form onSubmit={handleSubmit} className="w-full p-1">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <div>
                <div>
                    <p>Email <span className='text-red-600'>*</span></p>
                </div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-3"
                    required
                />
            </div>
            <div>
                <div>
                    <p>Password <span className='text-red-600'>*</span></p>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-3"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading || !valid}
                className={`w-full bg-blue-500 text-white p-2 rounded ${valid ? 'hover:bg-blue-800 hover:cursor-pointer':'pointer-events-none opacity-50'}`}
                >
                Login
            </button>
        </form>
    )
}

export default LoginForm;