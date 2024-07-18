import Appointment from "./Appointments";

const AppointmentsList = ({ appointments }) => {
  return (
    <div>
      {appointments.map((appointment) => {
        return <Appointment key={appointment.id} appointment={appointment} />;
      })}
    </div>
  );
};

export default AppointmentsList;
