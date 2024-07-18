import { Request, Response, NextFunction } from "express";
import UserDto from "../dtos/UserDto";
import CredentialDto from "../dtos/CredentialDto";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser: UserDto = req.body;
  const newCredential: CredentialDto = req.body;

  // Verificar que todos los campos están presentes
  if (
    !newUser.name ||
    !newUser.email ||
    !newUser.birthdate ||
    !newUser.nDni ||
    !newCredential.username ||
    !newCredential.password
  ) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios, incluyendo la foto",
    });
  }

  // Verificar tipos de datos correctos
  if (
    typeof newUser.name !== "string" ||
    typeof newUser.email !== "string" ||
    isNaN(Number(newUser.nDni))
  ) {
    return res.status(400).json({ message: "Los datos son incorrectos" });
  }

  // Verificar que birthdate es una fecha válida
  const birthdate = new Date(newUser.birthdate);
  if (isNaN(birthdate.getTime())) {
    return res
      .status(400)
      .json({ message: "La fecha de nacimiento no es válida" });
  }

  next();
};
