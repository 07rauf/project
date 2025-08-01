import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
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
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
 
    if (response.ok) {
  alert("Hesab uğurla yaradıldı!");
  localStorage.setItem("user", JSON.stringify(formData)); // Bura əlavə et
  setFormData({ firstname: "", email: "", password: "" });
  navigate("/home");
} else {
  alert(result.message);
}

  };

  return (
    <div className="register-body">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-title">Xoş Gəldiniz!</div>
        <div className="register-subtitle">Zəhmət olmasa yeni hesab yaradın</div>

        <div className="input-container input-firstname">
          <input
            id="firstname"
            name="firstname"
            className="input"
            type="text"
            placeholder=" "
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <div className="cut"></div>
          <label htmlFor="firstname" className="placeholder">Ad və Soyad</label>
        </div>

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

        <button type="submit" className="submit">Hesabı Yarat</button>
        <p onClick={() => navigate("/login")} className="switch-form">
          Hesabınız var? Daxil olun
        </p>
      </form>
    </div>
  );
};

export default Register;  