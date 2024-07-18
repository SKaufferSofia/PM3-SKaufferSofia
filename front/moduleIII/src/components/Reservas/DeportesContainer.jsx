// Componente Superior
import FormTurnos from "../../views/Reservas/Appointments/FormTurnos";

const DeportesContainer = () => {
  const deportes = ["Padel", "Voleibol", "Natación", "Fútbol"];

  return (
    <div>
      <FormTurnos sports={deportes} />
    </div>
  );
};

export default DeportesContainer;
