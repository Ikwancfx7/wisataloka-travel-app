// src/pages/LoginPage.jsx
import LoginForm from "../components/LoginForm";
import { useState } from "react";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  // console.log("API KEY:", import.meta.env.VITE_API_KEY);

  return (
    <div className="container mx-auto flex flex-col items-center w-[400px] bg-white p-6 rounded-xl shadow-md/20">
      <LoginForm setMessage={setMessage}/>
      {/* <p className="mt-4">Message</p> */}
      {message &&  (
        <div className='mt-4'>
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
