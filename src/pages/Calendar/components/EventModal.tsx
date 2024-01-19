import ReactDOM from "react-dom";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import Select, { SingleValue } from "react-select";
import { useState } from "react";
import IndividualPosterBlock from "./IndividualPosterBlock";
import { DocumentData, addDoc, collection, doc, setDoc } from "firebase/firestore";
import useCoords from "../hooks/useCoords";
import Catalog from "./Catalog";
import PropertiesBlock from "./PropertiesBlock";
import { useCalendarContext } from "../../Creator/context/CalendarContext";
import { ThemeProvider } from "../../Creator/context/ThemeContext";
import { db } from "../../../firebase/config";

export type selectOption = {
  label: string;
  value: string;
};

type props = {
  setIsOpen: (value: boolean) => void;
  date: string | null;
};

const EventModal = ({ setIsOpen, date }: props) => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const [selectedType, setSelectedType] = useState<SingleValue<selectOption | null>>(null);
  const [selectedPoster, setSelectedPoster] = useState<DocumentData | null>(null);
  const { calendarData } = useCalendarContext();
  const { coords } = useCoords(selectedPoster);
  const onChange = (value: SingleValue<selectOption | null>) => {
    setSelectedType(value);
  };
  const options = [
    { label: translate.individualGraphics[language], value: "individual" },
    { label: translate.themes[language], value: "themes" },
  ];
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const uniqueId = generateRandomId();
  console.log(selectedPoster);
  const handleSave = async () => {
    const ref = collection(db, "calendarPoster");
    await addDoc(ref, {
      ...selectedPoster,
      coords: uniqueId,
      date: date,
    });
    const coordsRef = doc(db, "calendarCoords", uniqueId);
    await setDoc(coordsRef, { ...calendarData }).then(() => setIsOpen(false));
  };

  return ReactDOM.createPortal(
    <div className="active-modal">
      <div className="add-window">
        <label>{translate.type[language]}</label>
        <Select options={options} value={selectedType} onChange={onChange} />
        <div className="border overflow-auto mt-2">
          <div className="container catalog-content d-flex w-100">
            {!coords && (
              <>
                {selectedType?.value === "themes" && <Catalog setSelectedPoster={setSelectedPoster} />}
                {selectedType?.value === "individual" && (
                  <IndividualPosterBlock setSelectedPoster={setSelectedPoster} />
                )}
              </>
            )}
            {coords && (
              <ThemeProvider>
                <PropertiesBlock
                  setSelectedPoster={setSelectedPoster}
                  selectedPoster={selectedPoster}
                  coords={coords}
                />
              </ThemeProvider>
            )}
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={() => setIsOpen(false)} className="btn">
            Anuluj
          </button>
          {coords && (
            <button onClick={handleSave} className="btn">
              Zaplanuj
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default EventModal;
