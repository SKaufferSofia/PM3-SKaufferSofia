import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/reducer";
import { validateLogin } from "../../../helpers/validate";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import style from "./FormLogin.module.css";
import { NEXT_PUBLIC_API_URL } from "../../../lib/server/env";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLogin, setFormlogin] = useState({
    username: "",
    password: "",
  });
  const [errorsData, setErrorsData] = useState({});

  const funcionLogin = async () => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/users/login`,
        formLogin
      );
      localStorage.setItem("userId", response.data.user.id);
      dispatch(addUser(response.data.user.id));
      swal({
        title: "Usuario logeado con exito",
        icon: "success",
        timer: 2000,
      });
      return true;
    } catch (error) {
      swal({
        title: "Error al iniciar sesion",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
      });
      return false;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormlogin({
      ...formLogin,
      [name]: value,
    });
    setErrorsData(
      validateLogin({
        ...formLogin,
        [name]: value,
      })
    );
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errorsData).length === 0) {
      const loginSuccess = await funcionLogin();
      if (loginSuccess) {
        navigate("/MisTurnos");
      }
    } else {
      alert("Completar los campos");
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className={`${style.formRegisterContainer}`}
    >
      <h3 className="poppins-bold">INICIAR SESIÓN</h3>
      <div className={`${style.formRegister} poppins-bold`}>
        <label>USUARIO</label>
        <input
          type="text"
          className={"form-control"}
          value={formLogin.username}
          name="username"
          placeholder="Ingresa tu usuario"
          onChange={handleInputChange}
        />
        {errorsData.username && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.username}
          </p>
        )}
        <label>CONTRASEÑA</label>
        <input
          type="password"
          className={"form-control"}
          value={formLogin.password}
          name="password"
          placeholder="Ingresa tu contraseña"
          onChange={handleInputChange}
        />
        {errorsData.password && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.password}
          </p>
        )}
      </div>
      <div
        style={{
          width: "500px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button
          className="btn btn-primary poppins-bold"
          disabled={
            (!formLogin.username && !formLogin.password) ||
            !formLogin.username ||
            !formLogin.password
          }
          type="submit"
        >
          INICIAR SESIÓN
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
