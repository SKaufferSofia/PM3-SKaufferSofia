import {
  AppDataSource,
  CredentialModel,
  UserModel,
} from "../config/data-source";
import CredentialDto from "../dtos/CredentialDto";
import UserDto from "../dtos/UserDto";
import { User } from "../entities/User";
import { createCredentialsService } from "./CredentialsService";

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: { appointments: true },
  });
  return users;
};

export const findById = async (id: number): Promise<User> => {
  const userById = await UserModel.findOne({
    where: { id },
    relations: { appointments: true },
  });
  if (userById === null) {
    throw new Error("Usuario no encontrado");
  }

  return userById;
};

export const createUserService = async (
  userData: UserDto,
  credentialData: CredentialDto
): Promise<User> => {
  const queryRuner = AppDataSource.createQueryRunner();
  await queryRuner.connect();

  try {
    await queryRuner.startTransaction();
    const newUser = await UserModel.create(userData);
    const userExists = await CredentialModel.findOne({
      where: { username: credentialData.username },
    });

    if (userExists) {
      throw Error("El usuario ya existe");
    } else {
      const newCredential = await createCredentialsService(credentialData);
      newUser.credentials = newCredential;
      await UserModel.save(newUser);
    }

    const credentialId = await CredentialModel.findOneBy({ id: newUser.id });

    if (credentialId) {
      credentialId.user = newUser;
      await CredentialModel.save(credentialId);
    }

    await queryRuner.commitTransaction();

    return newUser;
  } catch {
    await queryRuner.rollbackTransaction();
    throw Error("No se pudo crear el usuario");
  } finally {
    await queryRuner.release();
  }
};
