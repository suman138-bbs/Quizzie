import { Router } from "express";
import { signUp, login, refresh } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/refresh", refresh);
export default userRouter;
