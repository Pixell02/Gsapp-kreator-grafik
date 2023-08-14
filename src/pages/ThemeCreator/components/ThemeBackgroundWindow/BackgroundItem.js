import React from "react";

const BackgroundItem = ({ item, i, handleNameChange, handleSelectColor, handleDeleteItem }) => {
  return (
    <div className="d-flex w-100 flex-row">
      <div className="w-25">
        {item.src ? (
          <img src={item.src} style={{ maxWidth: "50px" }} alt="Background" />
        ) : (
          <div className="preview-placeholder" style={{ width: "50px" }}>
            Brak podglądu
          </div>
        )}
      </div>
      <input type="text" value={item.color} onChange={(e) => handleNameChange(e, i)} />
      <button onClick={() => handleSelectColor(item)} className="btn">
        wybierz
      </button>
      <button onClick={() => handleDeleteItem(item)} className="btn ml-2">Usuń</button>
    </div>
  );
};

export default BackgroundItem;
