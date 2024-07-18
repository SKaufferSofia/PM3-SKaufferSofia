import Register from "./Register/Register";
import style from "./Reserva.module.css";
import { Link } from "react-router-dom";

const Reserva = () => {
  return (
    <div className={`${style.loginPage}`}>
      <p
        className={`${style.text} ${"poppins-extrabold"}`}
        style={{ width: "1100px" }}
      >
        PARA HACER TU RESERVAR EN NUESTRAS INSTALACIONES Y DISFRUTAR DE TODAS
        LAS ACTIVIDADES DEPORTIVAS DEBES ESTAS REGISTRADO.
      </p>
      <p className="poppins-semibold" style={{ fontSize: "20px" }}>
        SI YA ESTAS REGISTRADO{" "}
        <Link
          to={"/Login"}
          style={{
            color: "yellow",
            textDecoration: "none",
            textShadow: "2px 2px 3px rgba(0, 0, 0, 0.726)",
          }}
        >
          HACE CLIC AQUI
        </Link>
      </p>
      <Register />
    </div>
  );
};

export default Reserva;
