import CarruselFutbol from "./Image/Carrusel-Futbol.jpg";
import CarruselPadel from "./Image/Carrusel-Padel.jpg";
import CarruselNatacion from "./Image/Carrusel-Natacion.jpg";
import styles from "./Carrusel.module.css";

const Carrusel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className={`${"carousel slide"} ${styles.carousel}`}
      data-bs-ride="carousel"
    >
      <div className={`${"carousel-inner"} ${styles.inner}`}>
        <div className={`${"carousel-item active"} ${styles.item}`}>
          <img src={CarruselPadel} className="d-block w-100" alt="..." />
        </div>
        <div className={`${"carousel-item"} ${styles.item}`}>
          <img src={CarruselNatacion} className="d-block w-100" alt="..." />
        </div>
        <div className={`${"carousel-item"} ${styles.item}`}>
          <img src={CarruselFutbol} className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
