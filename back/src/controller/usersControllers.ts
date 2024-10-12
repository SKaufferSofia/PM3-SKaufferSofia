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
import cloudinary from "cloudinary";

export const getAllUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json({ mesage: "todos los usuarios", users });
};

// export const createUser = async (req: Request, res: Response) => {
//   const newUser: UserDto = req.body;
//   const newCredential: CredentialDto = req.body;
//   const photoPath = req.file
//     ? `https://pm3-skauffersofia-production.up.railway.app/uploads/${req.file.filename}`
//     : null;
//   try {
//     await createUserService({ ...newUser, photo: photoPath }, newCredential);
//     res.status(201).json({ mesage: "usuario fue creado" });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ mesage: "Error al crear Usuario. El usuario ya existe" });
//   }
// };
export const createUser = async (req: Request, res: Response) => {
  const newUser: UserDto = req.body;
  const newCredential: CredentialDto = req.body;
  let photoUrl: string | null = null;

  try {
    // Si hay un archivo subido, lo subimos a Cloudinary
    if (req.file) {
      const result = await new Promise<{ url: string }>((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "polideportivo" }, // Puedes cambiar el nombre de la carpeta
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(req.file.buffer);
      });

      photoUrl = result.url;
    }

    // Crear el usuario con la URL de la foto de Cloudinary
    await createUserService({ ...newUser, photo: photoUrl }, newCredential);
    res.status(201).json({ message: "Usuario fue creado" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear Usuario. El usuario ya existe" });
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
