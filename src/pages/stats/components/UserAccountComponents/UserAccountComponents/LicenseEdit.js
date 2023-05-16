import React from "react";
import "./licenseEdit.css";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";



export default function LicenseEdit({ License, open, onClose }) {
  
  const [expireDate, setExpireDate] = useState(License[0].expireDate)

  const handleSave = () => {
    const docRef = doc(db, "user", License[0].id)
    updateDoc(docRef, {
      expireDate: expireDate
    })
    onClose();
  }

  return (
    <div className="license-modal">
      <div className="ml-5 mt-3">
        <div>
          <p>Licencja</p>
        </div>
        <div className="license-type-container">
          <label>data wygaśnięcia licencji</label>
          <input type="text" value={expireDate} className="w-50" onChange={e=> setExpireDate(e.target.value)} />
          <span>Format MM-DD-RRRR</span>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={onClose}>Anuluj</button>
          <button className="btn" onClick={() => handleSave()}>Zapisz</button>
        </div>
      </div>
    </div>
  );
}
