import QuestionAnswer from "../models/questionAnswer.model.js";
import User from "../models/user.model.js";
import Poll from "../models/poll.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const createQuestionAnswer = asyncHandler(async (req, res) => {
  const { name, quizForms } = req.body;

  const data = { name, questionsAnswer: quizForms };
  const userId = req.user._id;

  const qzName = await QuestionAnswer.findOne({ name });
  if (qzName) {
    throw new CustomError("Quiz name Already Exist", 400);
  }
  const newQuestionAnswer = await QuestionAnswer.create(data);
  await User.findByIdAndUpdate(userId, {
    $push: { quizes: { quiz_id: newQuestionAnswer._id } },
  });
  res
    .status(200)
    .json({ success: true, newQuestionAnswer, id: newQuestionAnswer._id });
});
export const getAllQuestionAnswer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const allQuizesIds = await User.findById(userId, "quizes");

  const quizIds = allQuizesIds.quizes.map((quiz) => quiz.quiz_id);

  const quizzes = await QuestionAnswer.find({ _id: { $in: quizIds } });

  res.status(200).json({ quizzes });
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.body;
  console.log(quizId);
  await QuestionAnswer.findByIdAndDelete(quizId);
  await Poll.findByIdAndDelete(quizId);
  res.status(200).json({ success: true, message: "Quiz Deleted Succesfully" });
});
