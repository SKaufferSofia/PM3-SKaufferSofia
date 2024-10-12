import { Request, Response } from "express";
import {
  createUserService,
  findById,
  getUsersService,
} from "../server/UsersService";
import CredentialDto from "../dtos/CredentialDto";
import UserDto from "../dtos/UserDto";
import { User } from "../entities/User";
import { validateCredentialsService } from "../server/CredentialsService";

export const getAllUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json({ mesage: "todos los usuarios", users });
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: UserDto = req.body;
  const newCredential: CredentialDto = req.body;
  const photoPath = req.file
    ? `http://localhost:4000/uploads/${req.file.filename}`
    : null;
  try {
    await createUserService({ ...newUser, photo: photoPath }, newCredential);
    res.status(201).json({ mesage: "usuario fue creado" });
  } catch (error) {
    res
      .status(400)
      .json({ mesage: "Error al crear Usuario. El usuario ya existe" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const validateCredential: CredentialDto = req.body;
  try {
    const credential = await validateCredentialsService(validateCredential);
    const user = credential.user;
    res.status(200).json({ login: true, user: user });
  } catch (error) {
    res
      .status(400)
      .json({ login: false, message: "Los datos son incorrectos" });
  }
};

export const userById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user: User = await findById(Number(id));
    res.status(200).json({ mesage: "El usuario fue encontrado", user });
  } catch (error) {
    res.status(404).json({ mesage: "usuario no encontrado" });
  }
};
