import QuestionAnswer from "../models/questionAnswer.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const createQuestionAnswer = asyncHandler(async (req, res) => {
  const { name, questionText, questionsAnswer } = req.body;
  const userId = req.user._id;

  const qzName = await QuestionAnswer.findOne({ name });
  if (qzName) {
    throw new CustomError("Quiz name Already Exist", 400);
  }
  const newQuestionAnswer = await QuestionAnswer.create({
    name,
    questionText,
    questionsAnswer,
  });
  await User.findByIdAndUpdate(userId, {
    $push: { quizes: { quiz_id: newQuestionAnswer._id } },
  });
  res.status(200).json({ newQuestionAnswer });
});
export const getAllQuestionAnswer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const allQuizesIds = await User.findById(userId, "quizes");

  // Extract quiz_ids from the result
  const quizIds = allQuizesIds.quizes.map((quiz) => quiz.quiz_id);

  // Get all data from QuestionAnswer based on the quiz_ids
  const quizzes = await QuestionAnswer.find({ _id: { $in: quizIds } });

  res.status(200).json({ quizzes });
});