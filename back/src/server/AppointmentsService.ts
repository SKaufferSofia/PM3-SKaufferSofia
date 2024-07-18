import {
  AppDataSource,
  AppointmentModel,
  UserModel,
} from "../config/data-source";
import AppointmentDto from "../dtos/AppointmentsDto";
import { Appointment } from "../entities/Appointments";
import { AppointmentStatus } from "../entities/Appointments";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const appointment = await AppointmentModel.find();
  return appointment;
};

export const detailsById = async (id: number): Promise<Appointment> => {
  const appointment = await AppointmentModel.findOneBy({ id });

  if (appointment === null) {
    throw new Error("Turno no encontrado");
  }

  return appointment;
};

export const createAppointmentService = async (
  appointmentData: AppointmentDto
): Promise<Appointment> => {
  appointmentData.status = AppointmentStatus.COMPLETED;

  const queryRuner = AppDataSource.createQueryRunner();
  await queryRuner.connect();

  try {
    await queryRuner.startTransaction();

    const newAppointment = await AppointmentModel.create(appointmentData);
    const userExists = await UserModel.findOne({
      where: { id: appointmentData.userId },
    });

    if (!userExists) {
      throw new Error("El usuario no existe");
    } else {
      newAppointment.user = userExists;
      await AppointmentModel.save(newAppointment);
    }

    const user = await UserModel.findOneBy({ id: appointmentData.userId });

    if (user) {
      newAppointment.user = user;
      AppointmentModel.save(newAppointment);
    }

    await queryRuner.commitTransaction();

    return newAppointment;
  } catch {
    await queryRuner.rollbackTransaction();
    throw new Error("Error al crear el turno");
  } finally {
    await queryRuner.release();
  }
};

export const cancelledAppointmentService = async (
  appointmentId: number
): Promise<Appointment> => {
  const appointment = await AppointmentModel.findOneBy({ id: appointmentId });
  if (appointment) {
    appointment.status = AppointmentStatus.CANCELED;
    await AppointmentModel.save(appointment);
  }
  if (appointment === null) {
    throw new Error("Turno no encontrado");
  }
  return appointment;
};
