import { Router } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import userRouter from "./usersRouter";
import appointmentRouter from "./appointmentsRouter";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

const routerMain: Router = Router();

routerMain.use("/users", upload.single("photo"), userRouter);
routerMain.use("/appointments", appointmentRouter);
// routerMain.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No se ha subido ningún archivo" });
//     }

//     // Subir archivo a Cloudinary
//     const result = await new Promise<{ url: string }>((resolve, reject) => {
//       const stream = cloudinary.v2.uploader.upload_stream(
//         { folder: "uploads" }, // Puedes cambiar el nombre de la carpeta en Cloudinary
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       stream.end(req.file.buffer);
//     });

//     // Responder con la URL de la imagen subida
//     res.status(200).json({ message: "Archivo subido con éxito", url: result.url });
//   } catch (error) {
//     res.status(500).json({ message: "Error al subir archivo a Cloudinary", error });
//   }
// });

export default routerMain;
