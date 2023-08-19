import { Router } from "express";
import { loginController, registerController } from '../controller/user-controller.js';

const userRouter = Router();


// REGISTER || METHOD : POST
userRouter.post("/register", registerController)


// LOGIN || METHOD : POST
userRouter.post("/login", loginController)

export default userRouter