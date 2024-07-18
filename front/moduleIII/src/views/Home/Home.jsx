import Carrusel from "../../components/Carrusel/Carrusel";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Vive el deporte, vive mejor.</p>
        <p className={`${styles.subtitle} ${"poppins-semibold"}`}>
          Visita nuestras modernas instalaciones deportivas.
        </p>
        <Link to="/Reserva">
          <button className="btn btn-primary">HACE TU RESERVA</button>
        </Link>
      </div>
      <Carrusel />
    </>
  );
};

export default Home;
