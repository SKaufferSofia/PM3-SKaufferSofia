export const validate = (input) => {
  const errors = {};
  if (!input.name) errors.name = "Nombre requerido";
  if (!input.email) {
    errors.email = "Escribir un mail valido";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Email no válido";
  }
  if (!input.birthdate) errors.birthdate = "Fecha de nacimiento requerida";
  if (!input.nDni) errors.nDni = "DNI requerido";
  if (!input.username) errors.username = "Usuario requerido";
  if (!input.password) {
    errors.password = "Contraseña requerida";
  } else if (input.password.length < 8) {
    errors.password = "Contraseña de mínimo 8 caracteres";
  }
  return errors;
};

export const validateLogin = (input) => {
  const errors = {};
  if (!input.username) errors.username = "Usuario requerido";
  if (!input.password) errors.password = "Contraseña requerida";
  return errors;
};

export const validateAppointment = (input) => {
  const errors = {};
  // Validar fecha
  if (!input.date) {
    errors.date = "Fecha requerida";
  } else {
    const dateParts = input.date.split("-");
    const appointmentDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2]
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate <= today) {
      errors.date =
        "La fecha del turno debe ser al menos un día después de la fecha actual";
    }
  }

  // Validar hora
  if (!input.time) {
    errors.time = "Hora requerida";
  } else {
    const appointmentTime = parseInt(input.time.split(":")[0], 10);
    if (appointmentTime < 10 || appointmentTime >= 21) {
      errors.time =
        "El horario del turno debe estar entre las 10:00 y las 21:00";
    }
  }

  // Validar deporte
  if (!input.sports) {
    errors.sports = "Deporte requerido";
  }

  return errors;
};
