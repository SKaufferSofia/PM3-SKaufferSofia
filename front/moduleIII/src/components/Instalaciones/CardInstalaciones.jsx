import styles from "./CardInstalaciones.module.css";
import { Link } from "react-router-dom";

const CardInstalaciones = ({ instalacion: { name, price, detail, image } }) => {
  return (
    <div>
      <div className={styles.card}>
        <h4>{name}</h4>
        <h1 style={{ color: "#0991f4" }} className="poppins-semibold">
          {price}
        </h1>
        <p>{detail}</p>
        <Link to="/Reserva">
          <button className="btn btn-primary">HACE TU RESERVA</button>
        </Link>
      </div>
    </div>
  );
};

export default CardInstalaciones;
