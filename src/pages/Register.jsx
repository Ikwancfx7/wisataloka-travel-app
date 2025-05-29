import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/AuthApi";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
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
    <div className="flex flex-col items-center justify-center py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="flex flex-row justify-evenly gap-5">
          <div>
            <div>
              <p>Nama <span className="text-red-600">*</span></p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full p-2 border rounded mb-3"
                required
              />
            </div>

            <div>
              <p>Email <span className="text-red-600">*</span></p>
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
              <p>Password <span className="text-red-600">*</span></p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded mb-3"
                required
              />
            </div>
            
            <div>
              <p>Repeat Password <span className="text-red-600">*</span></p>
              <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded mb-3"
                required
              />
            </div>
          </div>
          <div>
            <div>
              <p>Phone Number <span className="text-red-600">*</span></p>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded mb-3"
                required
              />
            </div>

            <div>
              <p>Role <span className="text-red-600">*</span></p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded mb-3"
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
          className={`w-full bg-green-500 text-white p-2 rounded ${valid ? 'hover:bg-green-800 hover:cursor-pointer' : 'pointer-events-none opacity-50'}`}
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

export default RegisterPage;
