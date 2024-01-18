import { useState } from "react";
import axios from "axios";
import style from "./style.module.css";

const Login = () => {
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email && !data.password) {
      setErrors("Please provide email and password");
      return;
    } else if (!isValidEmail(data.email)) {
      setErrors("Please provide a valid email address");
      return;
    } else if (data.password.length < 8) {
      setErrors("Password must be at least 8 characters long");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data, {
        withCredentials: true,
      });
      console.log("Response", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={style.formContainer}>
      <div className={style.loginFormContainer}>
        <div className={style.labelContainer}>
          <label htmlFor="email">Email</label>
          <label htmlFor="email">Password</label>
        </div>
        <div className={style.inputContainer}>
          <input
            type="email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <input
            type="password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
      </div>
      <div className={style.errorsContainer}>
        {errors && <span>{errors}</span>}
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
