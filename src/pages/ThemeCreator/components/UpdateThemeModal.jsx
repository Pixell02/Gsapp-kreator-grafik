import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/config';
import useStorage from '../../../hooks/useStorage';
import { BackgroundContext } from '../../posterCreator/Context/BackgroundContext';
import { GlobalPropertiesContext } from '../../posterCreator/Context/GlobalProperitesContext';
import { ManyBackgroundsContext } from '../../posterCreator/Context/ManyBackgroundsContext';
import './saveThemeModal.css';
import { useLanguageContext } from '../../../context/LanguageContext';

const UpdateThemeModal = ({ setIsOpen, defaultBackGround, backgrounds }) => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const { image } = useContext(BackgroundContext);
  const [userPoster, setUserPoster] = useState(defaultBackGround);
  const { globalProperties } = useContext(GlobalPropertiesContext);
  const { handleAddImage, progressInfo } = useStorage();
  const [catalog, setCatalog] = useState();
  useEffect(() => {
    const docRef = doc(db, 'catalog', userPoster.themeId);
    getDoc(docRef).then(doc => {
      setCatalog(doc.data());
    });
  }, [userPoster]);
  const handleAddDoc = async () => {
    if (manyBackgrounds?.length > 0) {
      manyBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(
          background.file,
          `${catalog.theme + ' ' + catalog.sport + ' ' + catalog.lang}/${userPoster.name}/${background.color}`
        );
        await addDoc(collection(db, 'piecesOfPoster'), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
    }
    if (backgrounds) {
      backgrounds.forEach(async (item, i) => {
        if (i !== 0) {
          await updateDoc(doc(collection(db, 'piecesOfPoster'), item.id), {
            color: item.color,
          });
        }
      });
    }
    if (!image.src.split('/')[7]) {
      const downloadURL = await handleAddImage(
        image.file,
        `${catalog.theme + ' ' + catalog.sport + ' ' + catalog.lang}/${userPoster.name}/${image.color}`
      );

      await updateDoc(doc(collection(db, 'piecesOfPoster'), globalProperties.id), {
        color: image.color,
        src: downloadURL,
      }).then(() => {
        setDoc(doc(collection(db, 'coords'), globalProperties.id), globalProperties);
      });
    } else {
      await updateDoc(doc(collection(db, 'piecesOfPoster'), globalProperties.id), {
        color: image.color,
      }).then(() => {
        setDoc(doc(collection(db, 'coords'), globalProperties.id), globalProperties);
      });
    }

    const docRef = doc(db, 'coords', globalProperties.id);
    const data = globalProperties ? globalProperties : { uid: globalProperties.id };
    await setDoc(docRef, data);

    navigate(`/${language}/creator/theme/${globalProperties.uid}`);
  };

  return (
    <div className="modal-container">
      <div className="modal-window rounded">
        <div className="p-3  d-flex flex-column h-100 w-100">
          <p>Aktualizuj grafikę</p>

          <label>Nazwa wzoru</label>
          <input
            type="text"
            value={defaultBackGround.name}
            onChange={e =>
              setUserPoster(prevState => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          {progressInfo && <span>{progressInfo}</span>}
          <div className="btn-container justify-content-end h-100 align-items-end mb-3">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary">
              Anuluj
            </button>
            <button
              onClick={handleAddDoc}
              className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateThemeModal;
