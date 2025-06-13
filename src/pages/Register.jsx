import RegisterForm from "../components/RegisterForm";
import RegisterFormMobile from "../components/Mobile/RegisterFormMobile";
const RegisterPage = () => {
  return (
    <>
      <div className="hidden md:flex">
        <RegisterForm />
      </div>
      <div className="md:hidden">
        <RegisterFormMobile />
      </div>
    </>
  )
};

export default RegisterPage;
