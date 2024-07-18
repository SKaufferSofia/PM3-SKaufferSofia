import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credentials } from "./Credential";
import { Appointment } from "./Appointments";
@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column("integer")
  nDni: number;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => Credentials)
  @JoinColumn()
  credentials: Credentials;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
