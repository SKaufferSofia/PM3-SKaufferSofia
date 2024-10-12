import AppointmentsList from "../../../components/Reservas/AppointmentsList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAppointments, allUser } from "../../../redux/reducer";
import axios from "axios";
import style from "./MisTurnos.module.css";
import DeportesContainer from "../../../components/Reservas/DeportesContainer";
import NavBarMisTurnos from "../../../components/Navbar/NavbarMisTurnos";
import { NEXT_PUBLIC_API_URL } from "../../../lib/server/env";

const MisTurnos = () => {
  const user = useSelector((state) => state.user);
  const appointments = useSelector((state) => state.userAppointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/users/${user}`
        );
        dispatch(allAppointments(response.data.user.appointments));
        dispatch(allUser(response.data.user));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, dispatch]);

  return (
    <div>
      <NavBarMisTurnos />
      <div className={style.appointmentsPage}>
        <p className="poppins-bold" style={{ textAlign: "center" }}>
          AQUÍ ENCONTRÁS LA INFORMACIÓN, HORARIOS, DÍAS DE TUS RESERVAS Y PODRÁS
          CANCELARLAS CUANDO DESEES
        </p>
        <div>
          <DeportesContainer />
        </div>
        <div>
          {appointments.length === 0 && (
            <p
              className="poppins-bold"
              style={{ margin: "50px", height: "350px" }}
            >
              No hay reservas
            </p>
          )}
          <AppointmentsList appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default MisTurnos;
