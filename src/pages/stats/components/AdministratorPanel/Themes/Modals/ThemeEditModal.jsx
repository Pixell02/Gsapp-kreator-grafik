import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../../../firebase/config";

const ThemeEditModal = ({ setIsOpen, selectedTheme }) => {
  const [themeName, setThemeName] = useState(selectedTheme.theme);

  const handleEditTheme = async () => {
    const docRef = doc(db, "catalog", selectedTheme.id);
    updateDoc(docRef, {
      theme: themeName,
    });
    setIsOpen();
  };

  return (
    <div className="modal-container">
      <div className="modal-window h-25 p-3">
        <div className="title">
          <p>Edytuj motyw</p>
        </div>
        <div className="d-flex flex-column">
          <label className="w-100">Nazwa motywu</label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
          />
        </div>
        <div className="btn-container w-100 d-flex align-items-end">
          <div className="w-100 d-flex justify-content-end">
            <button className="btn" onClick={setIsOpen}>
              Anuluj
            </button>
            <button className="btn" onClick={() => handleEditTheme()}>
              Zmień
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditModal;
