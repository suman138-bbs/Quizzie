import mongoose from "mongoose";

const questionAnswerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  impression: {
    type: Number,
    default: 0,
  },
  questionsAnswer: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
          },

          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
      totalAttempted: {
        type: Number,
        default: 0,
      },
      correctAttempted: {
        type: Number,
        default: 0,
      },
      incorrectAttempted: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const QuestionAnswer = mongoose.model("QuestionAnswer", questionAnswerSchema);
export default QuestionAnswer;
