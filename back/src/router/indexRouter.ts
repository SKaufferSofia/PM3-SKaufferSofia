import { Router } from "express";
import multer from "multer";
import userRouter from "./usersRouter";
import appointmentRouter from "./appointmentsRouter";

const routerMain: Router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

routerMain.use("/users", upload.single("photo"), userRouter);
routerMain.use("/appointments", appointmentRouter);

export default routerMain;
