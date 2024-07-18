import CardInstalaciones from "../../components/Instalaciones/CardInstalaciones";
import styles from "./Instalaciones.module.css";
import { useState } from "react";

const Instalaciones = () => {
  const [instalaciones, setInstalaciones] = useState([
    {
      id: 1,
      name: "CANCHAS DE FÚTBOL",
      price: "$15",
      detail: "SE ABONA EN LA ENTRADA",
      image: "/image/Fondo-Futbol.png",
    },
    {
      id: 2,
      name: "CANCHAS DE PADEL",
      price: "$10",
      detail: "SE ABONA EN LA ENTRADA",
      image: "/image/Fondo-Padel.png",
    },
    {
      id: 3,
      name: "CANCHAS DE VOLEIBOL",
      price: "$12",
      detail: "SE ABONA EN LA ENTRADA",
      image: "/image/Fondo-Voley.png",
    },
    {
      id: 4,
      name: "PILETA DE NATACIÓN",
      price: "$8",
      detail: "SE ABONA EN LA ENTRADA",
      image: "/image/Fondo-Natacion.png",
    },
  ]);
  setInstalaciones;

  const [backgroundImage, setBackgroundImage] = useState(
    "/image/Fondo-Futbol.png"
  );

  return (
    <div
      className={styles.instalacionesPage}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <p className={`${styles.text} ${"poppins-bold"}`}>
        PRECIOS ACCESIBLES PARA DISFRUTAR DEL MEJORES DEPORTES.
      </p>
      <div>
        <div style={{ display: "flex", margin: "50px" }}>
          {instalaciones.map((instalacion) => {
            return (
              <div
                key={instalacion.id}
                className={styles.cardContainter}
                onMouseEnter={() => setBackgroundImage(instalacion.image)}
                onMouseLeave={() =>
                  setBackgroundImage("/image/Fondo-Futbol.png")
                }
              >
                <CardInstalaciones instalacion={instalacion} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Instalaciones;
