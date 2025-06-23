import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
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
    <div className="container mx-auto flex flex-col items-center justify-center mt-25 p-8 z-20 w-[500px] md:w-[700px] md:bg-white/85 md:rounded-xl md:shadow-md/20">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <h2 className="flex justify-center text-xl font-semibold mb-4">REGISTER</h2>

        <div className="flex flex-col sm:items-center md:flex-row md:items-start md:justify-evenly gap-5 mb-4 w-full">
          <div className="w-full md:w-1/2">
            <div>
              <p className="italic">Name <span className="text-red-600">*</span></p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="custom-input-register"
                required
              />
            </div>

            <div>
              <p className="italic">Email <span className="text-red-600">*</span></p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="custom-input-register"
                required
              />
            </div>

            <div>
              <p className="italic">Password <span className="text-red-600">*</span></p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="custom-input-register"
                required
              />
            </div>
            
            <div>
              <p className="italic">Repeat Password <span className="text-red-600">*</span></p>
              <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Password"
                className="custom-input-register"
                required
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div>
              <p className="italic">Phone Number <span className="text-red-600">*</span></p>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="custom-input-register"
                required
              />
            </div>

            <div>
              <p className="italic">Role <span className="text-red-600">*</span></p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="custom-input-register"
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !valid}
          className={`flex justify-center w-[150px] bg-blue-500 text-white p-2 rounded-3xl ${valid ? 'hover:bg-blue-600 hover:cursor-pointer' : 'pointer-events-none opacity-50'}`}
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
  );
};

export default RegisterForm;
