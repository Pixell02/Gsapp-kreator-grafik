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
                Dodaliśmy możliwość dodania kilku drużyn do konta, przypisanie zawodników oraz przeciwników do danej drużyny.
              </p>
            </div>
          </div>
          <div className="buttons-container mt-5 ">
            <button
              className="btn primary-btn welcome-button close-update-btn mx-3"
              onClick={() => {
                onClose();
                localStorage.setItem("update1.0", true);
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
