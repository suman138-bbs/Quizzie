import { useState } from "react";
import style from "./style.module.css";

const Dashboard = () => {
  const [quiz, setQuiz] = useState(12);
  const [question, setQuestion] = useState(110);
  const [impression, setImpression] = useState(110);
  return (
    <div className={style.quizAndtred}>
      <div className={style.total}>
        <div>
          <div>
            <h1>{quiz}</h1>
            <h3>Quiz</h3>
          </div>
          <h3>Created</h3>
        </div>
        <div>
          <div>
            <h1>{quiz}</h1>
            <h3>Questions</h3>
          </div>
          <h3>Created</h3>
        </div>
        <div>
          <div>
            <h1>{impression}</h1>
            <h3>Total</h3>
          </div>
          <h3>Impressions</h3>
        </div>
      </div>
      <div className={style.quizContainer}>
        <h1>Trending Quizs</h1>
      </div>
    </div>
  );
};

export default Dashboard;
