import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "./envs";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credential";
import { Appointment } from "../entities/Appointments";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  //dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Credentials, Appointment],
  subscribers: [],
  migrations: [],
});

export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credentials);
export const AppointmentModel = AppDataSource.getRepository(Appointment);
