import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { LanguageContext } from "../../../context/LanguageContext";
import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/useCollection";
import useStorage from "../../../hooks/useStorage";
import { BackgroundContext } from "../../posterCreator/Context/BackgroundContext";
import { GlobalPropertiesContext } from "../../posterCreator/Context/GlobalProperitesContext";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import "./saveThemeModal.css";

export default function SaveThemeModal({ setIsOpen, backgrounds }) {
  const { documents: catalog } = useCollection("catalog");
  const { language } = useContext(LanguageContext);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  const { background, image } = useContext(BackgroundContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const myId = uuidv4().replace(/-/g, "");
  const navigate = useNavigate();
  const [id, setId] = useState();
  useEffect(() => {
    setId(myId);
  }, []);
  useEffect(() => {
    setGlobalProperties((prevState) => ({
      ...prevState,
      uid: id,
    }));
  }, [image, catalog]);
  const [catalogOption, setCatalogOption] = useState([]);
  const [savedThemeName, setSavedThemeName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState();
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
    if (manyBackgrounds) {
      manyBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(background.file, `${savedThemeName}/${themeName}/${background.color}`);
        addDoc(collection(db, "piecesOfPoster"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
    }

    if (image) {
      const downloadURL = await handleAddImage(image.file, `${savedThemeName}/${themeName}/${image.color}`);
      setDoc(doc(collection(db, "piecesOfPoster"), globalProperties.uid), {
        color: image.color,
        name: themeName,
        src: downloadURL,
        themeId: selectedTheme,
        uid: globalProperties.uid,
        uuid: globalProperties.uid,
      });
      setDoc(doc(collection(db, "coords"), globalProperties.uid), globalProperties ? globalProperties : { uid: id });
    }
    navigate(`/${language}/creator/theme/${globalProperties.uid}`);
  };

  return (
    <div className="modal-container">
      <div className="modal-window p-3">
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
