import ReactDOM from "react-dom";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import Select, { SingleValue } from "react-select";
import CatalogBlock from "../../Catalog/components/CatalogBlock";
import { useState } from "react";

type selectOption = {
  label: string;
  value: string;
};

const EventModal = () => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const [selectedType, setSelectedType] = useState<SingleValue<selectOption | null>>(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  console.log(selectedPoster);
  const onChange = (value: SingleValue<selectOption | null>) => {
    setSelectedType(value);
  };
  const options = [
    { label: translate.individualGraphics[language], value: "individual" },
    { label: translate.themes[language], value: "themes" },
  ];
  return ReactDOM.createPortal(
    <div className="active-modal">
      <div className="add-window">
        <label>{translate.type[language]}</label>
        <Select options={options} value={selectedType} onChange={onChange} />
        <div className="border overflow-scroll mt-2">
          {selectedType?.value === "themes" && <CatalogBlock setSelectedPoster={setSelectedPoster} />}
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default EventModal;
