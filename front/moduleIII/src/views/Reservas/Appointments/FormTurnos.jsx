import style from "./FormTurnos.module.css";
import swal from "sweetalert";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { validateAppointment } from "../../../helpers/validate";
import { addAppointments } from "../../../redux/reducer";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../server/env";

const FormTurnos = ({ sports }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formTurnosData, setFormTurnosData] = useState({
    date: "",
    time: "",
    sports: "",
    userId: "",
  });

  const [errorsTurnos, setErrorsTurnos] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormTurnosData({
      ...formTurnosData,
      [name]: value,
    });

    setErrorsTurnos(
      validateAppointment({
        ...formTurnosData,
        [name]: value,
      })
    );
  };

  const funcionPeticionAppointments = async () => {
    const formatDateToFrontend = (dateString) => {
      const parts = dateString.split("-"); // Suponiendo que la fecha recibida está en formato "yyyy-mm-dd"
      const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
      return formattedDate;
    };

    const transFormAppointments = {
      ...formTurnosData,
      userId: user,
      date: formatDateToFrontend(formTurnosData.date),
    };
    try {
      swal({
        title: "Cargando...",
        text: "Por favor espera.",
        icon: "info",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
      });

      const response = await axios.post(
        `${API_URL}/appointments/schedule`,
        transFormAppointments
      );

      console.log(response.data.newAppointment);
      dispatch(addAppointments(response.data.newAppointment));
      swal({
        title: "Reserva creada con exito",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      swal({
        title: "Error al crear la reserva",
        text: "Fecha o hora de atención no disponible, solo puede generar dos turnos por dia",
        icon: "error",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    funcionPeticionAppointments();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${style.cards} ${"poppins-semibold"}`}>
        <div className={`${style.cardAppointment} ${"card text-center"}`}>
          <div
            className={`${style["card-header"]} ${"card-header"}`}
            style={{ borderColor: "white" }}
          >
            <h5 className="card-title poppins-semibold">
              RESERVA TU SALA DEPORTIVA
            </h5>
          </div>
          <div className="card-body">
            <p
              className="poppins-regular"
              style={{ fontSize: "13px", color: "white" }}
            >
              COMPLETE EL FORMULARIO PARA GENERAR TU RESERVA.
              <p
                className="poppins-bold"
                style={{ fontSize: "13px", color: "red" }}
              >
                RECUERDE QUE NUESTRO HORARIO DE ATENCIÓN ES DE 10Hs A 21Hs Y
                SOLO PUEDE GENERAR HASTA DOS RESERVAS POR DÍA
              </p>
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <label>HORA</label>
                <input
                  type="time"
                  name="time"
                  value={formTurnosData.time}
                  onChange={handleInputChange}
                />
                {errorsTurnos.time && (
                  <p
                    className="poppins-regular"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errorsTurnos.time} hola
                  </p>
                )}
              </div>
              <div>
                <label>FECHA</label>
                <input
                  type="date"
                  name="date"
                  value={formTurnosData.date}
                  onChange={handleInputChange}
                />
                {errorsTurnos.date && (
                  <p
                    className="poppins-regular"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errorsTurnos.date}
                  </p>
                )}
              </div>
              <div
                style={{ position: "relative" }}
                className={style.selectWrapper}
              >
                <select
                  name="sports"
                  value={formTurnosData.sports}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un deporte</option>
                  {sports.map((sport, index) => (
                    <option key={index} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
                {errorsTurnos.sports && (
                  <p
                    className="poppins-regular"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errorsTurnos.sports}
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn btn-primary poppins-bold"
              disabled={
                (!formTurnosData.date &&
                  !formTurnosData.sports &&
                  !formTurnosData.time) ||
                !formTurnosData.date ||
                !formTurnosData.sports ||
                !formTurnosData.time
              }
              style={{ padding: "10px 20px" }}
            >
              AGREGAR RESERVA
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTurnos;
