import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  status: string;

  @Column()
  sports: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}

export enum AppointmentStatus {
  COMPLETED = "Active",
  CANCELED = "Cancelled",
}
