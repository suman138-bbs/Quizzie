import { useState } from "react";
import style from "./style.module.css";
import PlusIcon from ".././../../assets/plusIcon.svg";
import DeleteIcon from "../../../assets/deleteIcon.svg";

const QuestionAnsForm = () => {
  const [quizForms, setQuizForms] = useState([
    {
      questionText: "",
      options: [
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
      ],
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
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        },
      ]);
    }
  };

  const handleSetActiveForm = (index) => {
    setActiveFormIndex(index);
  };

  const handleQueInputChange = (index, value) => {
    setQuizForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index].questionText = value;
      console.log("PRE", prevForms);
      return updatedForms;
    });
  };
  const handleRemove = (indexToRemove) => {
    setQuizForms((prevForms) => {
      console.log("Previous", prevForms);
      const newForms = prevForms.filter((_, index) => index !== indexToRemove);
      return newForms;
    });

    if (activeFormIndex >= quizForms.length - 1) {
      setActiveFormIndex(quizForms.length - 2);
    }
  };

  const handleQuizType = (type) => {
    console.log(type);
  };

  const handleAddOption = () => {
    console.log("HELLO");
    setQuizForms((prev) => {
      if (prev[activeFormIndex].options.length < 5) {
        const updatedOptions = [
          ...prev[activeFormIndex].options,
          { option: "", isCorrect: false },
        ];

        const updatedForms = [...prev];
        updatedForms[activeFormIndex] = {
          ...updatedForms[activeFormIndex],
          options: updatedOptions,
        };

        return updatedForms;
      }
    });
  };

  const handleDeleteOption = (index) => {
    setQuizForms((prevForms) => {
      const updatedForms = prevForms.map((form, formIndex) => {
        if (formIndex === activeFormIndex) {
          return {
            ...form,
            options: form.options.filter(
              (_, optionIndex) => optionIndex !== index
            ),
          };
        }
        return form;
      });
      return updatedForms;
    });
  };

  return (
    <div className={style.quAnsContainer}>
      <div className={style.quesNumberContainer}>
        {quizForms.map((_, index) => (
          <div key={index}>
            <div className={style.queCountContainer}>
              <div
                onClick={() => {
                  handleSetActiveForm(index);
                }}
              >
                <span>{index + 1}</span>
              </div>
              {index > 0 && (
                <button
                  onClick={() => {
                    handleRemove(index);
                  }}
                  className={style.crossBtn}
                >
                  X
                </button>
              )}

              {index === quizForms.length - 1 && quizForms.length < 5 && (
                <button onClick={handleAddQuizForm} className={style.plusIcon}>
                  <img src={PlusIcon} alt="" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={style.quesDetailsConatiner}>
        {quizForms.map((_, index) => {
          return (
            index === activeFormIndex && (
              <div>
                <div className={style.questionName}>
                  <input
                    type="text"
                    placeholder="Question Name"
                    value={quizForms[index].questionText}
                    onChange={(e) => {
                      handleQueInputChange(index, e.target.value);
                    }}
                  />
                </div>
                <div className={style.optionTypeContainer}>
                  <div>
                    <span>Question Type </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={() => {
                        handleQuizType("Text");
                      }}
                      name="opType"
                    />
                    <label htmlFor="">Text</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={() => {
                        handleQuizType("Image");
                      }}
                      name="opType"
                    />
                    <label htmlFor="">Image URL</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={() => {
                        handleQuizType("ImgAndTxt");
                      }}
                      name="opType"
                    />
                    <label htmlFor="">Text & Image URL</label>
                  </div>
                </div>
                <div className={style.optionsContainer}>
                  <div>
                    {quizForms[activeFormIndex].options.map((option, index) => {
                      return (
                        <div key={index}>
                          <div className={style.optionContainer}>
                            <div>
                              <input type="radio" />
                              <input type="text" />
                            </div>
                            {index > 1 && (
                              <div
                                onClick={() => {
                                  handleDeleteOption(index);
                                }}
                              >
                                <img src={DeleteIcon} alt="" />
                              </div>
                            )}
                          </div>
                          {index < 4 &&
                            index ===
                              quizForms[activeFormIndex].options.length - 1 && (
                              <button
                                onClick={() => {
                                  handleAddOption();
                                }}
                              >
                                Add option
                              </button>
                            )}
                        </div>
                      );
                    })}
                  </div>
                  <div>timer</div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default QuestionAnsForm;

/**
 * {activeFormIndex === index && (
              <div>
                <div>
                  <input
                    type="text"
                   
                    value={quizForms[index].questionText}
                    onChange={(e) => {
                      handleQueInputChange(index, e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
 */
