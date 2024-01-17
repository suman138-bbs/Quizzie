import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
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
    required: true,
  },

  polls: [
    {
      pollText: {
        type: String,
        required: true,
      },
      options: [
        {
          name: {
            type: String,
            required: true,
          },
          selected: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
