import style from "./Login.module.css";
import FormLogin from "./FormLogin";
const Login = () => {
  return (
    <div className={style.loginPage}>
      <div className={style.form}>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
