import { Router } from "express";
import {
  appointmentsById,
  cancelAppointments,
  createAppointments,
  getAllAppointments,
} from "../controller/appointmentsControllers";
import { validateCreateAppointments } from "../middleware/validateAppointments";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.post(
  "/schedule",
  validateCreateAppointments,
  createAppointments
);
appointmentRouter.put("/cancel/:id", cancelAppointments);

appointmentRouter.get("/:id", appointmentsById);

export default appointmentRouter;
