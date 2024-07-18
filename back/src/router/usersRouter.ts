import { Router } from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  userById,
} from "../controller/usersControllers";
import { validateCreateUser } from "../middleware/validateUser";

const userRouter: Router = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", validateCreateUser, createUser);
userRouter.post("/login", loginUser);

userRouter.get("/:id", userById);

export default userRouter;
