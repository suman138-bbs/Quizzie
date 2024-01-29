import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";
import style from "./style.module.css";

const LiveQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [autoNextEnabled, setAutoNextEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [ShowScore, setShowScore] = useState(false);
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.post("/live-quiz", { quizId });
        setQuestions(res.data.data.questionsAnswer);
        setTimer(res.data.data.questionsAnswer[0].time); // Set the timer for the first question
        setAutoNextEnabled(res.data.data.questionsAnswer[0].time > 0); // Enable auto transition if the first question has a non-zero timer
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    getQuiz();
  }, [quizId]);

  useEffect(() => {
    let timerId;

    // Start the timer
    if (timer > 0 && autoNextEnabled) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Move to the next question when the timer reaches 0
    if (
      timer === 0 &&
      autoNextEnabled &&
      currentQnIndex < questions.length - 1
    ) {
      // Auto move to the next question
      setCurrentQnIndex((prevIndex) => prevIndex + 1);

      // Check if there's a next question
      if (currentQnIndex < questions.length - 1) {
        setTimer(questions[currentQnIndex + 1].time);
        setAutoNextEnabled(questions[currentQnIndex + 1].time > 0); // Enable auto transition if the next question has a non-zero timer
      }
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer, currentQnIndex, questions, autoNextEnabled]);

  const handleNextQuestion = () => {
    // Manually move to the next question if the timer is zero or autoNext is disabled
    if (currentQnIndex < questions.length - 1) {
      setCurrentQnIndex((prevIndex) => prevIndex + 1);

      // Check if there's a next question
      if (currentQnIndex < questions.length - 1) {
        setTimer(questions[currentQnIndex + 1].time);
        setAutoNextEnabled(questions[currentQnIndex + 1].time > 0); // Enable auto transition if the next question has a non-zero timer
      }
    }
  };

  console.log(questions);

  const handleSubmit = () => {
    setShowScore(true);
    console.log("Score", score);
  };

  if (questions.length === 0) {
    return <h1>Loading.......</h1>;
  }

  const handleSelectOption = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  return (
    <div className={style.LiveQuizContainer}>
      {!ShowScore && (
        <div>
          <div className={style.timerAndNum}>
            <h3>
              Question {currentQnIndex + 1} / {questions.length}
            </h3>
            <h3>{timer}S</h3>
          </div>
          <div className={style.quesAndOption}>
            <h3>{questions[currentQnIndex]?.questionText}</h3>
            <div className={style.optionContainer}>
              {questions[currentQnIndex]?.options.map((option, index) => {
                if (option.type === "text") {
                  return (
                    <div key={index}>
                      <button
                        className={style.optionBtn}
                        onClick={() => {
                          handleSelectOption(option.isCorrect);
                        }}
                      >
                        {option?.option}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <button
              onClick={
                currentQnIndex === questions.length - 1
                  ? handleSubmit
                  : handleNextQuestion
              }
              className={style.nextBtn}
            >
              {currentQnIndex === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
      {ShowScore && <div>your Score is{score}</div>}
    </div>
  );
};

export default LiveQuiz;
