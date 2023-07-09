import React from 'react'

import "./WelcomeModal.css";
export default function UpdateModal({ isOpen, onClose }) {
  return (
    <div className={isOpen ? "welcome-background" : "no-background"}>
      <div className="welcome-modal">
        <div className="welcome-add-window h-100">
          <div className='h-50'>
            <div className="welcome-title h-100">
              <p>Uwaga</p>
              <p className="welcome-content-text h-100">
                Prowadzimy aktualnie prace przy kreatorze i część rzeczy chwilowo nie działa m.in dodawanie do grafiki osób które strzeliły gola.
                Nie działają również chwilowo możliwość dodawania elementów na grafikach które mają możliwość dodania wielu drużyn takich jak terminarz.
                Z góry przepraszamy.
              </p>
            </div>
          </div>
          <div className="buttons-container mt-5 ">
            <button
              className="btn primary-btn welcome-button close-update-btn mx-3"
              onClick={() => {
                onClose();
                localStorage.setItem("update3.0", true);
              }}
            >
              Zamknij
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}