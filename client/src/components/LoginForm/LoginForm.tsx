import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5055/login", values)
      .then((res) => {
        console.log(res.data);

        if (res.data.Status === "Success") {
          navigate("/home");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="form-container">
      <p className="title">Welcome back</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          type="email"
          className="input"
          placeholder="Email"
          name="email"
        />
        <input
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          type="password"
          className="input"
          placeholder="Password"
          name="password"
        />

        <button className="form-btn">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
