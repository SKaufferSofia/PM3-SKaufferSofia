import style from "./Contacto.module.css";
import RedesSociales from "./Image/redes-sociales.svg";

const Contacto = () => {
  return (
    <div className={style.contactoPage}>
      <div className={style.container}>
        <h1 className={style.title}>CONTACTANOS</h1>
        <p className={style.text}>
          ¿Dudas sobre nuestras instalaciones o reservas? Contáctanos y te
          asistiremos con gusto.
        </p>
        <img src={RedesSociales} alt="" />
      </div>
    </div>
  );
};

export default Contacto;
