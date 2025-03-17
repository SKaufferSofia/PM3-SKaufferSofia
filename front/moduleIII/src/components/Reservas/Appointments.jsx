import style from "./Appointments.module.css";
import swat from "sweetalert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAppointmentStatus } from "../../redux/reducer";
import { API_URL } from "../../server/env";

const Appointment = ({ appointment: { id, date, time, status, sports } }) => {
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const cancelAppointment = () => {
    swat({
      title: "Cancelar de reserva",
      text: "No podrás recuperar esta reserva",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          swat({
            title: "Cargando...",
            text: "Por favor espera.",
            icon: "info",
            buttons: false,
            closeOnEsc: false,
            closeOnClickOutside: false,
          });
          const response = await axios.put(
            `${API_URL}/appointments/cancel/${id}`
          );
          if (response.status === 200) {
            dispatch(updateAppointmentStatus({ id, status: "Cancelled" }));
            swat("Reserva cancelada con éxito");
          }
        } catch (error) {
          console.error("Error:", error);
          swat("Error al cancelar la reserva", {
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className={`${style.cards} ${"poppins-semibold"}`}>
      <div className={`${style.cardAppointment} ${"card text-center"}`}>
        <div
          className={`${style["card-header"]} ${"card-header"}`}
          style={{ borderColor: "white" }}
        >
          {sports.toUpperCase()}
        </div>
        <div className="card-body">
          <div className={style.datos}>
            <h5 className="card-title poppins-semibold">HORA: {time}</h5>
            <h5 className="card-title poppins-semibold">
              FECHA: {formatDate(date)}
            </h5>
            <h5 className="card-title poppins-semibold">
              ESTADO:{" "}
              <span className={style[status]}>{status.toUpperCase()}</span>{" "}
            </h5>
          </div>
          <button
            disabled={status === "Cancelled"}
            className="btn btn-danger poppins-bold"
            style={{ marginTop: "25px" }}
            onClick={cancelAppointment}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
