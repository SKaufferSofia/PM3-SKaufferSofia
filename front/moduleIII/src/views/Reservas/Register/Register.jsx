import FormRegister from "./FormRegister";
import style from "./Register.module.css";

const Register = () => {
  return (
    <div className={`${style.registerPage}`}>
      <div className={`${style.form}`}>
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
