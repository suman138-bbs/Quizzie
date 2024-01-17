import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
