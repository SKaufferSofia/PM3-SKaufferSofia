import { Request, Response, NextFunction } from "express";
import { AppointmentModel } from "../config/data-source";

export const validateCreateAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time, userId, sports } = req.body;

  // Verificar que todos los campos están presentes
  if (!date || !time || !userId || !sports) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Verificar tipos de datos
  if (
    typeof date !== "string" ||
    typeof time !== "string" ||
    typeof userId !== "number"
  ) {
    return res.status(400).json({ message: "Los datos son incorrectos" });
  }

  // Verificar deportes disponibles
  const validSports = ["Padel", "Voleibol", "Natación", "Fútbol"];
  if (!validSports.includes(sports)) {
    return res.status(400).json({ message: "Deporte no disponible" });
  }

  // Convertir la fecha y hora a objetos Date
  const appointmentDate = new Date(date);
  const appointmentTime = parseInt(time.split(":")[0]);

  // Verificar que la fecha del turno sea al menos un día después de la fecha actual
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate <= today) {
    return res.status(400).json({
      message:
        "La fecha del turno debe ser al menos un día después de la fecha actual",
    });
  }

  // Verificar que el horario del turno esté dentro del rango permitido
  if (appointmentTime < 10 || appointmentTime >= 21) {
    return res.status(400).json({
      message: "El horario del turno debe estar entre las 13:00 y las 23:00",
    });
  }

  // Verificar que el usuario no tenga otro turno en el mismo día
  const existingAppointments = await AppointmentModel.find({
    where: {
      user: { id: userId },
      date: appointmentDate,
    },
  });

  if (existingAppointments.length > 1) {
    return res
      .status(400)
      .json({ message: "El usuario ya tiene un turno en esa fecha" });
  }

  next();
};
