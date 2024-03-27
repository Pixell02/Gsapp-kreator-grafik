import React from "react";
import "./licenseEdit.css";
import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function LicenseEdit({ email, License, onClose }) {
  const { user } = useAuthContext();
  const [expireDate, setExpireDate] = useState(License.expireDate);

  const handleSave = () => {
    const docRef = doc(db, "user", License.id);
    updateDoc(docRef, {
      license: "full-license",
      expireDate: expireDate,
    });
    const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `Przyznana licencja do ${expireDate}`,
      to: email.email,
      date: Date.now(),
    });
    onClose();
  };

  return (
    <div className="license-modal">
      <div className="ml-5 mt-3">
        <div>
          <p>Licencja</p>
        </div>
        <div className="license-type-container">
          <label>data wygaśnięcia licencji</label>
          <input type="text" value={expireDate} className="w-50" onChange={(e) => setExpireDate(e.target.value)} />
          <span>Format MM-DD-RRRR</span>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={onClose}>
            Anuluj
          </button>
          <button className="btn" onClick={() => handleSave()}>
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}
