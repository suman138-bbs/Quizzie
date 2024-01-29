import { Router } from "express";
import { liveQuiz } from "../controllers/liveQuiz.controller.js";

const liveQuizRouter = Router();
liveQuizRouter.post("/", liveQuiz);

export default liveQuizRouter;
