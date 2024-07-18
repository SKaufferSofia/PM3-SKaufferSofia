import { AppointmentStatus } from "../entities/Appointments";

interface AppointmentDto {
  date: Date;
  time: string;
  userId: number;
  sports: string;
  status: AppointmentStatus;
}

export default AppointmentDto;
