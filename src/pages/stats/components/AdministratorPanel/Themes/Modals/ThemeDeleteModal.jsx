import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import ReactDOM from "react-dom";
import { db } from "../../../../../../firebase/config";

const ThemeDeleteModal = ({ setIsOpen, selectedTheme }) => {
  const [themeName, setThemeName] = useState("");
  const handleDeleteTheme = async () => {
    const posterRef = query(collection(db, "piecesOfPoster"), where("themeId", "==", selectedTheme.id));

    onSnapshot(posterRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      results.forEach((doc) => {
        const posterThemeRef = query(collection(db, "piecesOfPoster"), where("uuid", "==", doc.uuid));
        onSnapshot(posterThemeRef, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            const colorThemeRef = doc(db, "piecesOfPoster", doc.id);
            deleteDoc(colorThemeRef);
          });
        });
        const posRef = doc(db, "piecesOfPoster", doc.id);
        deleteDoc(posRef);
      });
    });

    const docRef = doc(db, "catalog", selectedTheme.id);
    await deleteDoc(docRef);
    setIsOpen();
  };

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-window h-25 p-3">
        <div className="title">
          <p>Usuń motyw</p>
        </div>
        <div className="d-flex flex-column">
          <label className="w-100">Nazwa motywu</label>
          <input
            type="text"
            placeholder={selectedTheme.theme}
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
          />
        </div>
        <div className="btn-container w-100 d-flex align-items-end">
          <div className="w-100 d-flex justify-content-end">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Anuluj
            </button>
            <button className="btn" onClick={() => handleDeleteTheme()} disabled={themeName !== selectedTheme.theme}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ThemeDeleteModal;
