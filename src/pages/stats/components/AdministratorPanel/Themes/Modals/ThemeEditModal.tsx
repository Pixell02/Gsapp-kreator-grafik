import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../../../../../firebase/config";
import Portal from "../../../../../../components/Portal";
import ButtonContainer from "../../../../../../components/ButtonContainer";
import { ThemeData } from "./ThemeAddModal";
import PlanButton from "../components/PlanButton";
import { Catalog } from "../../../../../../types/creatorComponentsTypes";
import PasswordInput from "../components/PasswordInput";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTheme: Catalog;
};

const ThemeEditModal = ({ setIsOpen, selectedTheme }: props) => {
  const [themeData, setThemeData] = useState<ThemeData>({
    id: selectedTheme.id,
    theme: selectedTheme.theme,
    sport: selectedTheme.sport,
    public: selectedTheme.public,
    type: selectedTheme.type,
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setThemeData((prev) => ({ ...prev, [className]: value }));
  };

  const handleEditTheme = async () => {
    const docRef = doc(db, "catalog", selectedTheme.id);
    await updateDoc(docRef, {
      ...themeData,
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
            <input type="text" className="theme" value={themeData.theme} onChange={handleValueChange} />
            <PasswordInput setThemeData={setThemeData} />
            <PlanButton setThemeData={setThemeData} handleValueChange={handleValueChange} />
          </div>
          <ButtonContainer handleClick={() => setIsOpen(false)} handleSubmit={handleEditTheme} />
        </div>
      </div>
    </Portal>
  );
};

export default ThemeEditModal;
