import "./RegisterForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5055/register", values)
      .then((res) => {
        console.log(res.data);

        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="form-container">
        <p className="title">Create account</p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            type="text"
            className="input"
            placeholder="Name"
            name="name"
          />
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
          <button className="form-btn">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
