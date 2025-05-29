// src/pages/LoginPage.jsx
import LoginForm from "../components/LoginForm";
import { useState } from "react";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  // console.log("API KEY:", import.meta.env.VITE_API_KEY);

  return (
    <div className="flex flex-col items-center py-10 w-[40%] bg-white p-6 rounded shadow-md">
      <LoginForm setMessage={setMessage}/>
      {message &&  (
        <div className='mt-5'>
              <p className={`text-center ${message === 'Login success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
          </div>
      )}
    </div>
    // <div className="flex flex-row items-center justify-center border">
    // </div>
  );
};

export default LoginPage;
