import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/AuthApi";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterFormMobile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    // const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const buttonValid = () => {
        const isValid =
        email.trim() &&
        password.trim() &&
        name.trim() &&
        password === passwordRepeat &&
        phoneNumber.trim() &&
        role.trim();

    setValid(isValid);
    };

    // const isPasswordMatch = password.trim() & passwordRepeat.trim() ? (password === passwordRepeat ? true : false) : false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const userData = {
            email,
            name,
            password,
            passwordRepeat: password,
            role,
            phoneNumber,
            // profilePictureUrl,
        };
        const data = await registerUser(userData);

        login(data.token, data.data); // login otomatis setelah registrasi
        setMessage("Register success");
        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 2000);
        } catch (error) {
        setErrorMsg(error.message || "Register gagal");
        setMessage(errorMsg);
        setLoading(false);
        }
    };

    useEffect(() => {
        buttonValid();
    }, [email, password, name, passwordRepeat, phoneNumber, role]);

  return (
    <div className="flex flex-col items-center justify-center mb-13 p-8 w-full md:bg-white md:rounded-xl md:shadow-md/20">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <h2 className="flex justify-center text-xl font-semibold mb-4">REGISTER</h2>

        <div className="flex flex-col sm:items-center md:flex-row md:items-start md:justify-evenly gap-5 mb-4 w-full">
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <div className="w-full">
              <p className="text-blue-700 font-semibold">Nama <span className="text-red-600">*</span></p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="register-input"
                required
              />
            </div>

            <div className="w-full">
              <p className="text-blue-700 font-semibold">Email <span className="text-red-600">*</span></p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="register-input"
                required
              />
            </div>

            <div className="w-full">
              <p className="text-blue-700 font-semibold">Password <span className="text-red-600">*</span></p>
              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="register-input"
                  required
                />
                <div
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} className="text-white" /> : <Eye size={20} className="text-white" />}
                </div>
              </div>
            </div>
            
            <div className="w-full">
              <p className="text-blue-700 font-semibold">Repeat Password <span className="text-red-600">*</span></p>
              <div className="relative">
                <input
                  type={showPasswordRepeat ? "text" : "password"}
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  placeholder="Password"
                  className="register-input"
                  required
                />
                <div
                      className="absolute right-3 top-3 cursor-pointer text-gray-600"
                      onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                  >
                      {showPasswordRepeat ? <EyeOff size={20} className="text-white" /> : <Eye size={20} className="text-white" />}
                  </div>

              </div>
            </div>

            <div className="w-full">
              <div>
                <p className="text-blue-700 font-semibold">Phone Number <span className="text-red-600">*</span></p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="register-input"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-10 mt-3 w-full">
              <p className="font-semibold text-blue-700">Role :<span className="text-red-600">*</span></p>
              <div className="flex flex-row items-center gap-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    value="user"
                    onClick={(e)=>setRole(e.target.value)}
                    className={`w-[100px] p-2 rounded-2xl mb-3 text-white ${role === 'user' ? 'bg-blue-600' : 'bg-blue-400'}`}>
                      User
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    value="admin"
                    onClick={(e)=>setRole(e.target.value)}
                    className={`w-[100px] p-2 rounded-2xl mb-3 text-white ${role === 'admin' ? 'bg-blue-600' : 'bg-blue-400'}`}>
                      Admin
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-1">
              <p>Do you have an account?</p>
              <Link to="/login" className="text-blue-600">Login</Link>
            </div>

          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !valid}
          className={`flex justify-center w-[300px] bg-blue-500 text-white p-2 rounded-3xl mt-5 ${valid ? 'hover:bg-blue-600 hover:cursor-pointer' : 'pointer-events-none opacity-50'}`}
        >
          Register
        </button>
      </form>

      {message && (
        <div className="mt-5">
          <p className={`text-center ${message === "Register success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        </div>
      )}
    </div>
    )
};

export default RegisterFormMobile