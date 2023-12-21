import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { db } from "../../../firebase/config";

const EditPlaceWindow = ({ data, onClose }) => {
  const [place, setPlace] = useState(data.place);

  const handleSave = () => {
    const docRef = doc(db, "placePreset", data.id);
    updateDoc(docRef, {
      place: place,
    });
    onClose();
  };
  return  <div className="active-modal">
  <div className="add-window">
    <label>Miejsce</label>
    <input type="text" value={place} onChange={(e) => setPlace(e.target.value)}/>
    <div className="d-flex w-100 justify-content-end">
      <button className="btn" onClick={() => onClose()}>Zamknij</button>
      <button className="btn" onClick={handleSave} >Dodaj</button>
    </div>
  </div>
  
</div>;
};

export default EditPlaceWindow;
