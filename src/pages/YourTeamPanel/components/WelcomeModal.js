import React, { useState } from "react";
import "./WelcomeModal.css";
import freeImage from "../../../img/5freeUsesImage.jpg";
import { useNavigate } from "react-router-dom";

export default function WelcomeModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  return (
    <div className={isOpen ? "welcome-background" : "no-background"}>
      <div className="welcome-modal">
        <div className="welcome-add-window">
          <div>
            <div className="welcome-title">
              <p>Witaj użytkowniku !</p>
            </div>
            <div className="welcome-content">
              <p className="welcome-content-text">
                Dziękujemy za zarejestrowanie sie.
              </p>
              <p className="welcome-content-text">
                na start otrzymujesz możliwość wygenerowania 5 grafik za darmo.
              </p>
            </div>
            <img src={freeImage} alt="plakat" className="image-border" />
            <div className="welcome-content">
              <p className="welcome-content-text">
                Jeżeli potrzebujesz pomocy w obsłudze aplikacji kliknij
                samouczek.
              </p>
            </div>
          </div>
          <div className="buttons-container">
            <button
              className="btn primary-btn welcome-button"
              onClick={() => {
                onClose();
                localStorage.setItem("first", true);
              }}
            >
              Zamknij
            </button>
            <button className="btn primary-btn welcome-button" onClick={() => {navigate("/guide");localStorage.setItem("first", true);}}>Samouczek</button>
          </div>
        </div>
      </div>
    </div>
  );
}
