 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const previousColor = document.documentElement.style.backgroundColor;
    document.documentElement.style.backgroundColor = "rgb(18, 32, 123)";
    return () => {
      document.documentElement.style.backgroundColor = previousColor;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

  
    if (user) {
  localStorage.setItem("user", JSON.stringify(user));
  navigate("/home");
} else {
  alert("E-mail və ya şifrə yanlışdır!");
}

  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-title">Xoş Gəldiniz!</div>
        <div className="login-subtitle">Zəhmət olmasa daxil olun</div>

        <div className="input-container input-email">
          <input
            id="email"
            name="email"
            className="input"
            type="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="cut cut-short"></div>
          <label htmlFor="email" className="placeholder">E-mail</label>
        </div>

        <div className="input-container input-password">
          <input
            id="password"
            name="password"
            className="input"
            type="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="cut"></div>
          <label htmlFor="password" className="placeholder">Şifrə</label>
        </div>

        <button type="submit" className="submit">Daxil Ol</button>
        <p onClick={() => navigate("/register")} className="switch-form">
          Hesabınız yoxdur? Qeydiyyatdan keçin
        </p>
      </form>
    </div>
  );
};

export default Login;