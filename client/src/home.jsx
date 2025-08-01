import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-logo">Logo</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#vacancies">Vakansiyalar</a>
        </div>
        {user && (
          <div className="nav-profile" onClick={toggleProfile}>
            <div className="nav-profile-avatar">
              {user.firstname.charAt(0).toUpperCase()}
            </div>
            {user.firstname}
          </div>
        )}
      </nav>

      {showProfile && user && (
        <div className="profile-modal">
          <div className="modal-content">
            <span className="close" onClick={toggleProfile}>&times;</span>
            <h3>Profil Məlumatları</h3>
            <p><strong>Ad:</strong> {user.firstname}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button className="logout-button" onClick={handleLogout}>
              Çıxış et
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
