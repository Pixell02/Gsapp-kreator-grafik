import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../../../../../firebase/config";
import Portal from "../../../../../../components/Portal";
import { Catalog } from "../../../../../../hooks/useSearchDocsByQuery";
import ButtonContainer from "../../../../../../components/ButtonContainer";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTheme: Catalog;
};

const ThemeEditModal = ({ setIsOpen, selectedTheme }: props) => {
  const [themeName, setThemeName] = useState(selectedTheme.theme);

  const handleEditTheme = async () => {
    const docRef = doc(db, "catalog", selectedTheme.id);
    await updateDoc(docRef, {
      theme: themeName,
    });
    setIsOpen(false);
  };

  return (
    <Portal>
      <div className="modal-container">
        <div className="modal-window h-auto p-3">
          <div className="title">
            <p>Edytuj motyw</p>
          </div>
          <div className="d-flex flex-column">
            <label className="w-100">Nazwa motywu</label>
            <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} />
          </div>
          <ButtonContainer handleClick={() => setIsOpen(false)} handleSubmit={handleEditTheme} />
        </div>
      </div>
    </Portal>
  );
};

export default ThemeEditModal;
