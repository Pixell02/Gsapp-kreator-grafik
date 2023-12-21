import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/useCollection";
import useStorage from "../../../hooks/useStorage";
import { useBackgroundContext } from "../Context/BackgroundContext";

import "./saveThemeModal.css";
import { useLanguageContext } from "../../../context/LanguageContext";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";

export default function SaveThemeModal({ setIsOpen }) {
  const { documents: catalog } = useCollection("catalog");
  const { language } = useLanguageContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const { image, newBackgrounds } = useBackgroundContext();
  const navigate = useNavigate();
  const [catalogOption, setCatalogOption] = useState(null);
  const [savedThemeName, setSavedThemeName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const { handleAddImage, progressInfo } = useStorage();
  const [themeName, setThemeName] = useState("");
  const handleThemeSelect = (option) => {
    setSelectedTheme(option.value);
    setSavedThemeName(option.label);
  };

  useEffect(() => {
    if (catalog) {
      const options = catalog.map((option) => ({
        label: option.theme + " " + option.sport + " " + option.lang,
        value: option.id,
      }));
      setCatalogOption(options);
    }
  }, [catalog]);

  const handleAddDoc = async () => {
    if (newBackgrounds) {
      newBackgrounds.forEach(async (background) => {
        const downloadURL = await handleAddImage(background.file, `${savedThemeName}/${themeName}/${background.color}`);
        addDoc(collection(db, "piecesOfPoster"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
    }

    if (image.file) {
      const downloadURL = await handleAddImage(image.file, `${savedThemeName}/${themeName}/${image.color}`);
      await setDoc(doc(collection(db, "piecesOfPoster"), globalProperties.uid), {
        color: image.color,
        name: themeName,
        src: downloadURL,
        themeId: selectedTheme,
        uid: globalProperties.uid,
        uuid: globalProperties.uid,
      });
      await setDoc(doc(collection(db, "coords"), globalProperties.uid), {
        ...globalProperties,
        uid: globalProperties.uid,
      });
    }
    navigate(`/${language}/creator/theme/${globalProperties.uid}`);
  };

  return (
    <div>
      <div className="mt-3 h-100">
        <p>Dodaj motyw</p>
        <span>motyw</span>
        <Select options={catalogOption} onChange={(option) => handleThemeSelect(option)} />
        <span>Nazwa wzoru</span>
        <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} />
        {progressInfo}
        <div className="btn-container w-100 h-50">
          <div className="w-100 d-flex justify-content-end align-items-end">
            <button className="btn" onClick={setIsOpen}>
              Anuluj
            </button>
            <button className="btn" onClick={handleAddDoc}>
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
