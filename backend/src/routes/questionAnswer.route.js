import { Router } from "express";
import {
  createQuestionAnswer,
  getAllQuestionAnswer,
} from "../controllers/questionAnswer.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const quesAnsRouter = Router();

quesAnsRouter.post("/craeteQNA", isLoggedIn, createQuestionAnswer);
quesAnsRouter.get("/getAllQNA", isLoggedIn, getAllQuestionAnswer);

export default quesAnsRouter;
