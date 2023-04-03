import React from 'react'

import "./WelcomeModal.css";
export default function UpdateModal({ isOpen, onClose }) {
  return (
    <div className={isOpen ? "welcome-background" : "no-background"}>
      <div className="welcome-modal">
        <div className="welcome-add-window h-100">
          <div className='h-50'>
            <div className="welcome-title h-100">
              <p>Aktualizacja</p>
              <p className="welcome-content-text h-100">
                Dodaliśmy opcję przybliżania i oddalania grafik używając scrolla w myszce, bądź palców na telefonie. Dzięki temu grafiki o większym formacie mieszczą się w oknie
                na wszystkich urządzeniach. 
              </p>
            </div>
          </div>
          <div className="buttons-container mt-5 ">
            <button
              className="btn primary-btn welcome-button close-update-btn mx-3"
              onClick={() => {
                onClose();
                localStorage.setItem("update2.0", true);
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
