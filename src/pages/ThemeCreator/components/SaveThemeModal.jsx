import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../firebase/config';
import { useCollection } from '../../../hooks/useCollection';
import useStorage from '../../../hooks/useStorage';
import { BackgroundContext } from '../../posterCreator/Context/BackgroundContext';
import { GlobalPropertiesContext } from '../../posterCreator/Context/GlobalProperitesContext';
import { ManyBackgroundsContext } from '../../posterCreator/Context/ManyBackgroundsContext';
import './saveThemeModal.css';
import { useLanguageContext } from '../../../context/LanguageContext';

export default function SaveThemeModal({ setIsOpen }) {
  const { documents: catalog } = useCollection('catalog');
  const { language } = useLanguageContext();
  const { globalProperties } = useContext(GlobalPropertiesContext);
  const { image } = useContext(BackgroundContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const myId = uuidv4().replace(/-/g, '');
  console.log('id: ', myId);
  const navigate = useNavigate();
  const [catalogOption, setCatalogOption] = useState([]);
  const [savedThemeName, setSavedThemeName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState();
  const { handleAddImage, progressInfo } = useStorage();
  const [themeName, setThemeName] = useState('');
  const handleThemeSelect = option => {
    setSelectedTheme(option.value);
    setSavedThemeName(option.label);
  };

  useEffect(() => {
    if (catalog) {
      const options = catalog.map(option => ({
        label: option.theme + ' ' + option.sport + ' ' + option.lang,
        value: option.id,
      }));
      setCatalogOption(options);
    }
  }, [catalog]);

  const handleAddDoc = async () => {
    if (manyBackgrounds) {
      manyBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(background.file, `${savedThemeName}/${themeName}/${background.color}`);
        addDoc(collection(db, 'piecesOfPoster'), {
          color: background.color,
          src: downloadURL,
          uuid: myId,
        });
      });
    }

    if (image) {
      const downloadURL = await handleAddImage(image.file, `${savedThemeName}/${themeName}/${image.color}`);
      await setDoc(doc(collection(db, 'piecesOfPoster'), myId), {
        color: image.color,
        name: themeName,
        src: downloadURL,
        themeId: selectedTheme,
        uid: myId,
        uuid: myId,
      });
      await setDoc(doc(collection(db, 'coords'), myId), { ...globalProperties, uid: myId });
    }
    navigate(`/${language}/creator/theme/${myId}`);
  };

  return (
    <div className="modal-container">
      <div className="modal-window p-3">
        <p>Dodaj motyw</p>
        <span>motyw</span>
        <Select
          options={catalogOption}
          onChange={option => handleThemeSelect(option)}
        />
        <span>Nazwa wzoru</span>
        <input
          type="text"
          value={themeName}
          onChange={e => setThemeName(e.target.value)}
        />
        {progressInfo}
        <div className="btn-container w-100 h-50">
          <div className="w-100 d-flex justify-content-end align-items-end">
            <button
              className="btn"
              onClick={setIsOpen}>
              Anuluj
            </button>
            <button
              className="btn"
              onClick={handleAddDoc}>
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
