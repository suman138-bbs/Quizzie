import { useState, useRef } from "react";
import style from "./style.module.css";
import PlusIcon from ".././../../assets/plusIcon.svg";
import DeleteIcon from "../../../assets/deleteIcon.svg";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios";
import { toast } from "react-toastify";

const QuestionAnsForm = ({ name }) => {
  const navigate = useNavigate();
  const [quizSuccess, setQuizSuccess] = useState({});
  const urlRef = useRef(null);
  const [quizForms, setQuizForms] = useState([
    {
      questionText: "",
      options: [
        { type: "", option: "", isCorrect: false, imageUrl: "" },
        { type: "", option: "", isCorrect: false, imageUrl: "" },
      ],
      time: 0,
    },
  ]);

  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [quizType, setQuizType] = useState("Text");

  const handleAddQuizForm = () => {
    if (quizForms.length < 5) {
      setQuizForms((prevForms) => [
        ...prevForms,
        {
          questionText: "",
          options: [
            { type: "", option: "", isCorrect: false, imageUrl: "" },
            { type: "", option: "", isCorrect: false, imageUrl: "" },
          ],
          time: 0,
        },
      ]);
      setActiveFormIndex(activeFormIndex + 1);
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
    setQuizType(type);
  };

  const handleAddOption = () => {
    console.log("HELLO");
    setQuizForms((prev) => {
      if (prev[activeFormIndex].options.length < 5) {
        const updatedOptions = [
          ...prev[activeFormIndex].options,
          { type: "", option: "", isCorrect: false, imageUrl: "" },
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

  const handleCorrectOption = (index) => {
    setQuizForms((prev) => {
      const updatedForms = [...prev];
      const updatedOptions = updatedForms[activeFormIndex].options.map(
        (option, i) => ({
          ...option,
          isCorrect: i === index,
        })
      );

      updatedForms[activeFormIndex] = {
        ...updatedForms[activeFormIndex],
        options: updatedOptions,
      };

      return updatedForms;
    });
  };

  const handleOptioninput = (index, value, type) => {
    if (type === "text") {
      setQuizForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[activeFormIndex].options[index] = {
          ...updatedForms[activeFormIndex].options[index],
          option: value,
          type: type,
        };
        return updatedForms;
      });
    } else if (type === "image") {
      setQuizForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[activeFormIndex].options[index] = {
          ...updatedForms[activeFormIndex].options[index],
          imageUrl: value,
          type: type,
        };
        return updatedForms;
      });
    }
  };

  const handleOptionTxt = (index, value) => {
    setQuizForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[activeFormIndex].options[index] = {
        ...updatedForms[activeFormIndex].options[index],
        option: value,
        type: "txtAndImg",
      };
      return updatedForms;
    });
  };

  const handleOptionImg = (index, value) => {
    setQuizForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[activeFormIndex].options[index] = {
        ...updatedForms[activeFormIndex].options[index],
        imageUrl: value,
        type: "txtAndImg",
      };
      return updatedForms;
    });
  };

  const handleCancel = () => {
    navigate("/app/dashboard");
  };

  const handleTimer = (time) => {
    setQuizForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[activeFormIndex].time = time;

      return updatedForms;
    });
  };

  const handleCreateQuiz = async () => {
    if (!quizForms[activeFormIndex].questionText.trim()) {
      toast.error("Question name cannot be empty");
      return;
    }

    const isOptionSelected = quizForms[activeFormIndex].options.some(
      (option) => option.isCorrect
    );
    if (!isOptionSelected) {
      toast.error("Select at least one correct option");
      return;
    }

    const currentOptions = quizForms[activeFormIndex].options;

    // Check based on quizType
    if (quizType === "Text") {
      const isEmptyOptionText = currentOptions.some(
        (option) => option.option.trim() === ""
      );

      if (isEmptyOptionText) {
        toast.error("Option text cannot be empty");
        return;
      }
    }

    if (quizType === "Image") {
      const isEmptyOptionImage = currentOptions.some(
        (option) => option.imageUrl.trim() === ""
      );

      if (isEmptyOptionImage) {
        toast.error("Image URL cannot be empty");
        return;
      }
    }

    if (quizType === "ImgAndTxt") {
      const isEmptyOptionText = currentOptions.some(
        (option) => option.option.trim() === ""
      );

      const isEmptyOptionImage = currentOptions.some(
        (option) => option.imageUrl.trim() === ""
      );

      if (isEmptyOptionText || isEmptyOptionImage) {
        toast.error("Option text or image URL cannot be empty");
        return;
      }
    }

    try {
      const res = await axios.post(
        "/app/craeteQNA",
        { name, quizForms },
        { withCredentials: true }
      );
      console.log("rs", res);
      if (res.data?.success) {
        setQuizSuccess({ success: res.data?.success, id: res?.data?.id });
        toast.success("Quiz Created Successfully");
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  const handleCopyUrl = () => {
    const urlInput = urlRef.current;

    if (urlInput.value) {
      urlInput.select();

      document.execCommand("copy");

      window.getSelection().removeAllRanges();

      toast.success("URL copied to clipboard!");
    }
  };

  console.log("Form", quizForms);
  if (quizSuccess.success) {
    return (
      <div className={style.publishQZ}>
        <button onClick={handleCancel}>X</button>
        <h3>Congrats your Quiz is Published!</h3>
        <input
          type="text"
          value={`http://localhost:5173/live-quiz/${quizSuccess.id}`}
          ref={urlRef}
        />
        <div>
          <button onClick={handleCopyUrl}>Share</button>
        </div>
      </div>
    );
  }
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
                      checked={quizType === "Text"}
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
                  {quizType == "Text" && (
                    <div>
                      {quizForms[activeFormIndex].options.map(
                        (option, index) => {
                          return (
                            <div key={index}>
                              <div className={style.optionContainer}>
                                <div>
                                  <input
                                    type="radio"
                                    onChange={() => {
                                      handleCorrectOption(index);
                                    }}
                                    checked={option.isCorrect}
                                    name="option"
                                  />
                                  <input
                                    type="text"
                                    className={
                                      option.isCorrect
                                        ? style.selectedOption
                                        : ""
                                    }
                                    value={option.option}
                                    placeholder="Text"
                                    onChange={(e) => {
                                      handleOptioninput(
                                        index,
                                        e.target.value,
                                        "text"
                                      );
                                    }}
                                  />
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
                              </div>
                              <div className={style.addBtn}>
                                {index < 4 &&
                                  index ===
                                    quizForms[activeFormIndex].options.length -
                                      1 && (
                                    <button
                                      onClick={() => {
                                        handleAddOption();
                                      }}
                                    >
                                      Add option
                                    </button>
                                  )}
                                {index ===
                                  quizForms[activeFormIndex].options.length -
                                    1 && (
                                  <button
                                    className={style.cancelBtn}
                                    onClick={handleCancel}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                  {quizType == "Image" && (
                    <div>
                      {quizForms[activeFormIndex].options.map(
                        (option, index) => {
                          return (
                            <div key={index}>
                              <div className={style.optionContainer}>
                                <div>
                                  <input
                                    type="radio"
                                    onChange={() => {
                                      handleCorrectOption(index);
                                    }}
                                    checked={option.isCorrect}
                                    name="option"
                                  />
                                  <input
                                    type="text"
                                    className={
                                      option.isCorrect
                                        ? style.selectedOption
                                        : ""
                                    }
                                    placeholder="Image URL"
                                    value={option.imageUrl}
                                    onChange={(e) => {
                                      handleOptioninput(
                                        index,
                                        e.target.value,
                                        "image"
                                      );
                                    }}
                                  />
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
                              </div>
                              <div className={style.addBtn}>
                                {index < 4 &&
                                  index ===
                                    quizForms[activeFormIndex].options.length -
                                      1 && (
                                    <button
                                      onClick={() => {
                                        handleAddOption();
                                      }}
                                    >
                                      Add option
                                    </button>
                                  )}
                                {index < 4 &&
                                  index ===
                                    quizForms[activeFormIndex].options.length -
                                      1 && (
                                    <button
                                      className={style.cancelBtn}
                                      onClick={handleCancel}
                                    >
                                      Cancel
                                    </button>
                                  )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                  {quizType == "ImgAndTxt" && (
                    <div>
                      {quizForms[activeFormIndex].options.map(
                        (option, index) => {
                          return (
                            <div key={index}>
                              <div className={style.optionContainer}>
                                <div>
                                  <input
                                    type="radio"
                                    onChange={() => {
                                      handleCorrectOption(index);
                                    }}
                                    checked={option.isCorrect}
                                    name="option"
                                  />
                                  <input
                                    type="text"
                                    className={
                                      option.isCorrect
                                        ? style.selectedOption
                                        : ""
                                    }
                                    value={option.option}
                                    placeholder="Text"
                                    onChange={(e) => {
                                      handleOptionTxt(index, e.target.value);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    className={
                                      option.isCorrect
                                        ? style.selectedOption
                                        : ""
                                    }
                                    value={option.imageUrl}
                                    placeholder="Image"
                                    onChange={(e) => {
                                      handleOptionImg(index, e.target.value);
                                    }}
                                  />
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
                              </div>
                              <div className={style.addBtn}>
                                {index < 4 &&
                                  index ===
                                    quizForms[activeFormIndex].options.length -
                                      1 && (
                                    <button
                                      onClick={() => {
                                        handleAddOption();
                                      }}
                                    >
                                      Add option
                                    </button>
                                  )}
                                {index < 4 &&
                                  index ===
                                    quizForms[activeFormIndex].options.length -
                                      1 && (
                                    <button
                                      className={style.cancelBtn}
                                      onClick={handleCancel}
                                    >
                                      Cancel
                                    </button>
                                  )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}

                  <div className={style.timerContainer}>
                    <div>
                      <h4>Timer</h4>

                      {[0, 5, 10].map((time) => (
                        <button
                          key={time}
                          className={
                            quizForms[activeFormIndex].time === time
                              ? style.timerBtn
                              : ""
                          }
                          onClick={() => {
                            handleTimer(time);
                          }}
                        >
                          {time ? `${time} Sec` : "OFF"}
                        </button>
                      ))}
                    </div>
                    <div>
                      <button onClick={handleCreateQuiz}>Create Quiz</button>
                    </div>
                  </div>
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
