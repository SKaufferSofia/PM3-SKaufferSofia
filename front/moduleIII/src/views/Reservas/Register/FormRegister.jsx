import swat from "sweetalert";
import axios from "axios";
import { useState } from "react";
import { validate } from "../../../helpers/validate";
import { useNavigate } from "react-router-dom";
import style from "./FormRegister.module.css";
import { API_URL } from "../../../server/env";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    photo: null,
  });

  const navigate = useNavigate();

  const [errorsData, setErrorsData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorsData(
      validate({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const funcionPeticion = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("birthdate", formData.birthdate);
    formDataToSend.append("nDni", formData.nDni);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("photo", formData.photo); // Añadir el archivo

    try {
      const response = await axios.post(
        `${API_URL}/users/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      swat({
        title: "Usuario creado con exito",
        icon: "success",
        timer: 2000,
      });
      return true;
    } catch (error) {
      // alert("Error al crear el usuario, puede que el usuario ya exista");
      swat({
        title: "Error al crear el usuario",
        text: "Puede ser que el usuario ya exista",
        icon: "error",
      });
      return false;
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errorsData).length === 0) {
      const registerSuccess = await funcionPeticion();

      if (registerSuccess) {
        navigate("/Login");
      }
    } else {
      swat({
        title: "Completar los campos",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className={`${style.formRegisterContainer}`}
    >
      <h3 className="poppins-bold">REGISTRARSE</h3>
      <div className={`${style.formRegister} poppins-bold`}>
        <label>NOMBRE</label>
        <input
          type="text"
          value={formData.name}
          name="name"
          placeholder="Ingresa tu nombre"
          onChange={handleInputChange}
        />
        {errorsData.name && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.name}
          </p>
        )}
        <label>EMAIL</label>
        <input
          type="email"
          value={formData.email}
          name="email"
          placeholder="Ingresa tu email"
          onChange={handleInputChange}
        />
        {errorsData.email && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.email}
          </p>
        )}
        <label>FECHA DE NACIMIENTO</label>
        <input
          type="date"
          value={formData.birthdate}
          name="birthdate"
          onChange={handleInputChange}
        />
        {errorsData.birthdate && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.birthdate}
          </p>
        )}
        <label>N° DE DOCUMENTO</label>
        <input
          type="number"
          value={formData.nDni}
          name="nDni"
          placeholder="Ingresa tu n° de documento"
          onChange={handleInputChange}
        />
        {errorsData.nDni && (
          <p
            className="poppins-regular"
            style={{ color: "red", fontSize: "12px" }}
          >
            {errorsData.nDni}
          </p>
        )}
        <label>USUARIO</label>
        <input
          type="text"
          value={formData.username}
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
          value={formData.password}
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
        <label>FOTO</label>
        <input type="file" name="photo" onChange={handleFileChange} />
      </div>

      <button className={`${"btn btn-primary poppins-bold"}`}>
        REGISTRARSE
      </button>
    </form>
  );
};

export default FormRegister;
