import { addDoc, collection } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../../../../../firebase/config";
import ButtonContainer from "../../../../../../components/ButtonContainer";
import PlanButton from "../components/PlanButton";
import Portal from "../../../../../../components/Portal";
import { Catalog } from "../../../../../../types/creatorComponentsTypes";
import PasswordInput from "../components/PasswordInput";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  themes: Catalog[];
  selectedSportOption: string;
  selectedType: "normal" | "story";
};

export type ThemeData = {
  id?: string;
  password?: string;
  theme: string;
  sport: string;
  public: boolean;
  date?: Date;
  type: "normal" | "story";
};

export default function ThemeAddModal({ setIsOpen, selectedType, themes, selectedSportOption }: props) {
  const [themeData, setThemeData] = useState<ThemeData>({
    theme: `motyw ${themes.length + 1}`,
    sport: selectedSportOption,
    type: selectedType,
    public: false,
  });
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setThemeData((prev) => ({ ...prev, [className]: value }));
  };

  const handleSaveTheme = async () => {
    const docRef = collection(db, "catalog");
    await addDoc(docRef, {
      ...themeData,
    });
    setIsOpen(false);
  };

  return (
    <Portal>
      <div className="modal-container">
        <div className="modal-window h-auto p-3">
          <div className="title">
            <p>Dodaj motyw</p>
          </div>
          <div className="d-flex flex-column">
            <label className="w-100">Nazwa motywu</label>
            <input type="text" value={themeData.theme} className="theme" onChange={handleValueChange} />
            <PasswordInput setThemeData={setThemeData} />
            <PlanButton setThemeData={setThemeData} handleValueChange={handleValueChange} />
          </div>
          <ButtonContainer handleClick={() => setIsOpen(false)} handleSubmit={handleSaveTheme} />
        </div>
      </div>
    </Portal>
  );
}
