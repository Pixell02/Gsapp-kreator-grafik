import React from "react";

const TopBar = ({ handleFileUpload, setSelectedWindow }) => {
  return (
    <div className="handle d-flex flex-row">
      <div className="d-flex align-items-center">
        <label htmlFor="layers" onClick={() => setSelectedWindow(1)} className="file-input-label">
          tła
        </label>
      </div>
      <label htmlFor="layers"  onClick={() => setSelectedWindow(2)} className="file-input-label">
        Warstwy
      </label>
      <div className="w-100 d-flex justify-content-end">
        <label htmlFor="file-input" className="file-input-label">
          Dodaj tła
        </label>
        <input id="file-input" type="file" multiple onChange={handleFileUpload} className="file-input" />
      </div>
    </div>
  );
};

export default TopBar;
