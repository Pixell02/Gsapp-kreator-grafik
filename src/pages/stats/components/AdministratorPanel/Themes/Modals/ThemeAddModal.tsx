import { addDoc, collection } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { db } from "../../../../../../firebase/config";
import { Catalog } from "../../../../../../hooks/useSearchDocsByQuery";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  themes: Catalog[];
  selectedSportOption: string;
};

export default function ThemeAddModal({ setIsOpen, themes, selectedSportOption }: props) {
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    if (themes) {
      setThemeName(`motyw ${themes.length + 1}`);
    }
  }, [themes]);

  const handleSaveTheme = () => {
    const docRef = collection(db, "catalog");
    addDoc(docRef, {
      public: false,
      sport: selectedSportOption,
      theme: themeName,
    });
    setIsOpen(false);
  };

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-window h-25 p-3">
        <div className="title">
          <p>Dodaj motyw</p>
        </div>
        <div className="d-flex flex-column">
          <label className="w-100">Nazwa motywu</label>
          <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} />
        </div>
        <div className="btn-container w-100 d-flex align-items-end">
          <div className="w-100 d-flex justify-content-end">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Anuluj
            </button>
            <button className="btn" onClick={() => handleSaveTheme()}>
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
}
