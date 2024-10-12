import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./MiPerfil.module.css";
import { useEffect } from "react";
import NavBarMisTurnos from "../../../../components/Navbar/NavbarMisTurnos";
import { addUser, allUser } from "../../../../redux/reducer";
import { API_URL } from "../../../../server/env";
const MiPerfil = () => {
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let userId = user;
      if (!userId) {
        userId = localStorage.getItem("userId");
        if (userId) {
          dispatch(addUser(userId));
        } else {
          return; // Si no hay userId, salir de la función
        }
      }

      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        dispatch(allUser(response.data.user));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, dispatch]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES"); // Formato de fecha en español (DD/MM/YYYY)
  };

  return (
    <div>
      <NavBarMisTurnos />
      <div className={styles.perfilPage}>
        <h1 className={styles.text}>MI PERFIL</h1>
        <h3 className={styles.subtext}>
          AQUÍ ENCONTRÁS LA INFORMACIÓN, HORARIOS, DÍAS DE TUS RESERVAS Y PODRÁS
          CANCELARLAS CUANDO DESEES
        </h3>
        <div className={styles.cardPerfil}>
          <div className={styles.imgContainer}>
            <img
              src={
                userData.photo ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
              className={styles.img}
            />
          </div>
          <div className={styles.info}>
            <p>NOMBRE: {userData.name}</p>
            <p>EMAIL: {userData.email}</p>
            <p>DNI {userData.nDni}</p>
            <p> FECHA DE NACIMIENTO: {formatDate(userData.birthdate)}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
