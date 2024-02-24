import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../../../../../firebase/config";
import Portal from "../../../../../../components/Portal";
import { poster } from "../../../../../../components/PosterItem";
import { Catalog } from "../../../../../../hooks/useSearchDocsByQuery";
import ButtonContainer from "../../../../../../components/ButtonContainer";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTheme: Catalog;
};

const ThemeDeleteModal = ({ setIsOpen, selectedTheme }: props) => {
  const [themeName, setThemeName] = useState("");
  const handleDeleteTheme = async () => {
    const posterRef = query(collection(db, "piecesOfPoster"), where("themeId", "==", selectedTheme.id));

    onSnapshot(posterRef, (snapshot) => {
      const results: poster[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id } as poster);
      });
      results.forEach((item) => {
        const posterThemeRef = query(collection(db, "piecesOfPoster"), where("uuid", "==", item.uuid));
        onSnapshot(posterThemeRef, (snapshot) => {
          snapshot.docs.forEach((snapDoc) => {
            const colorThemeRef = doc(db, "piecesOfPoster", snapDoc.id);
            deleteDoc(colorThemeRef);
          });
        });
        const posRef = doc(db, "piecesOfPoster", item.id);
        deleteDoc(posRef);
      });
    });

    const docRef = doc(db, "catalog", selectedTheme.id);
    await deleteDoc(docRef);
    setIsOpen(false);
  };

  return (
    <Portal>
      <div className="modal-container">
        <div className="modal-window h-auto p-3">
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
          <ButtonContainer handleClick={() => setIsOpen(false)} handleSubmit={handleDeleteTheme} />
        </div>
      </div>
    </Portal>
  );
};

export default ThemeDeleteModal;
