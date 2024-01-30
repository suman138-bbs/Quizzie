import { Router } from "express";
import {
  createQuestionAnswer,
  getAllQuestionAnswer,
  deleteQuiz,
} from "../controllers/questionAnswer.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const quesAnsRouter = Router();

quesAnsRouter.post("/craeteQNA", isLoggedIn, createQuestionAnswer);
quesAnsRouter.get("/getAllQNA", isLoggedIn, getAllQuestionAnswer);
quesAnsRouter.put("/deleteQuiz", isLoggedIn, deleteQuiz);

export default quesAnsRouter;
