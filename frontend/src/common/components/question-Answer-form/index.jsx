import React, { useState } from "react";

const QuestionAnsForm = () => {
  const [quizForms, setQuizForms] = useState([
    {
      questionText: "",
      options: [
        { option: "", isCorrect: true },
        { option: "", isCorrect: false },
      ],
      totalAttempted: 0,
      correctAttempted: 0,
      incorrectAttempted: 0,
    },
  ]);

  const [activeFormIndex, setActiveFormIndex] = useState(0);

  const handleAddQuizForm = () => {
    if (quizForms.length < 5) {
      setQuizForms((prevForms) => [
        ...prevForms,
        {
          questionText: "",
          options: [
            { option: "", isCorrect: true },
            { option: "", isCorrect: false },
          ],
          totalAttempted: 0,
          correctAttempted: 0,
          incorrectAttempted: 0,
        },
      ]);
    }
  };

  const handleSetActiveForm = (index) => {
    setActiveFormIndex(index);
  };

  const handleInputChange = (index, field, value) => {
    setQuizForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index][field] = value;
      return updatedForms;
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {quizForms.map((_, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              color: index === activeFormIndex ? "blue" : "black",
            }}
            onClick={() => handleSetActiveForm(index)}
          >
            {index + 1}
          </div>
        ))}
        {quizForms.length < 5 && <button onClick={handleAddQuizForm}>+</button>}
      </div>

      <div>
        {quizForms.map(
          (quiz, index) =>
            index === activeFormIndex && (
              <div key={index}>
                <label>
                  Question Text:
                  <input
                    type="text"
                    value={quiz.questionText}
                    onChange={(e) =>
                      handleInputChange(index, "questionText", e.target.value)
                    }
                  />
                </label>

                {quiz.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label>
                      Option:
                      <input
                        type="text"
                        value={option.option}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `options[${optionIndex}].option`,
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <label>
                      Is Correct:
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `options[${optionIndex}].isCorrect`,
                            e.target.checked
                          )
                        }
                      />
                    </label>
                  </div>
                ))}

                <label>
                  Total Attempted:
                  <input
                    type="number"
                    value={quiz.totalAttempted}
                    onChange={(e) =>
                      handleInputChange(index, "totalAttempted", e.target.value)
                    }
                  />
                </label>
                <label>
                  Correct Attempted:
                  <input
                    type="number"
                    value={quiz.correctAttempted}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "correctAttempted",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Incorrect Attempted:
                  <input
                    type="number"
                    value={quiz.incorrectAttempted}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "incorrectAttempted",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default QuestionAnsForm;
