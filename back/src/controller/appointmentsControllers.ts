import { Request, Response } from "express";
import {
  cancelledAppointmentService,
  createAppointmentService,
  detailsById,
  getAppointmentsService,
} from "../server/AppointmentsService";
import { Appointment } from "../entities/Appointments";
import AppointmentDto from "../dtos/AppointmentsDto";
import sendEmail from "../utils/sendEmail";
import { UserModel } from "../config/data-source";

export const getAllAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await getAppointmentsService();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ mesage: "No se encontraron los turnos" });
  }
};

export const createAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const appointmentData: AppointmentDto = req.body;
  try {
    const newAppointment: Appointment = await createAppointmentService(
      appointmentData
    );

    const user = await UserModel.findOne({
      where: { id: appointmentData.userId },
    });
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Reserva creada con éxito",
        `Te estaperamos en nuestra institución el dia ${appointmentData.date} a las ${appointmentData.time} en la sede ${appointmentData.sports}`
      );
    }
    res.status(201).json({ mesage: "turno creado", newAppointment });
  } catch (error) {
    res
      .status(400)
      .json({ mesage: "Error al crear el turno, el usuario no existe" });
  }
};

export const appointmentsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const appointment = await detailsById(Number(id));
    res.status(200).json({ mesage: "El turno fue encontrado", appointment });
  } catch (error) {
    res.status(404).json({ mesage: "El turno no fue encontrado" });
  }
};
export const cancelAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const appointment = await cancelledAppointmentService(Number(id));

    const user = await UserModel.findOne({
      where: { appointments: { id: Number(id) } },
    });
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Reserva cancelada",
        `El turno del dia ${appointment.date} a las ${appointment.time} en la sede ${appointment.sports} fue cancelado con exito`
      );
    }
    res.status(200).json({ mesage: "turno cancelado", appointment });
  } catch (error) {
    res.status(404).json({ mesage: "El turno no fue encontrado" });
  }
};
