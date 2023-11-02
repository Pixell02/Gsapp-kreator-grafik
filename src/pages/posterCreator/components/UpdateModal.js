import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { db } from "../../../firebase/config";
import useStorage from "../../../hooks/useStorage";
import { BackgroundContext } from "../Context/BackgroundContext";
import { GlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { ManyBackgroundsContext } from "../Context/ManyBackgroundsContext";

export default function UpdateModal({ isOpen, setIsOpen, defaultBackGround, backgrounds }) {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useContext(LanguageContext);
  const { image } = useContext(BackgroundContext);
  const { handleAddImage, progressInfo } = useStorage();
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [userPoster, setUserPoster] = useState(defaultBackGround);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);

  useEffect(() => {
    setUserPoster((prevState) => ({
      ...prevState,
      color: image.color,
    }));
  }, [image]);
  useEffect(() => {
    setGlobalProperties((prev) => ({
      ...prev,
      uid: params.id,
    }));
  }, [setGlobalProperties, params]);

  const handleAddDoc = async () => {
    if (manyBackgrounds) {
      manyBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(
          background.file,
          `${defaultBackGround.uid}/posters/${defaultBackGround.uuid + backgrounds.length + i}`
        );
        addDoc(collection(db, "yourCatalog"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
      await updateDoc(doc(collection(db, "yourCatalog"), globalProperties.uid), userPoster);
    }
    if (backgrounds) {
      backgrounds.forEach(async (item, i) => {
        if (i !== 0) {
          await updateDoc(doc(collection(db, "yourCatalog"), item.id), {
            color: item.color,
          });
        }
      });
    }
    if (!image.src.split("/")[7]) {
      const downloadURL = await handleAddImage(image.file, `${defaultBackGround.uid}/posters/${globalProperties.uid}`);

      await updateDoc(doc(collection(db, "yourCatalog"), globalProperties.id), {
        color: image.color,
        src: downloadURL,
      }).then(() => {
        setDoc(doc(collection(db, "coords"), globalProperties.id), globalProperties);
      });
    } else {
      await updateDoc(doc(collection(db, "yourCatalog"), globalProperties.id), {
        color: image.color,
      }).then(() => {
        setDoc(doc(collection(db, "coords"), globalProperties.id), globalProperties);
      });
    }
    navigate(`/${language}/creator/${globalProperties.uid}`);
  };

  return (
    <div className={isOpen ? "modal" : "closed-modal"}>
      <div className="modal-window rounded">
        <div className="p-3  d-flex flex-column h-100 w-100">
          <p>Aktualizuj grafikę</p>

          <label>Nazwa wzoru</label>
          <input
            type="text"
            value={defaultBackGround.name}
            onChange={(e) =>
              setUserPoster((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          {progressInfo && <span>{progressInfo}</span>}
          <div className="btn-container justify-content-end h-100 align-items-end mb-3">
            <button onClick={() => setIsOpen(false)} className="btn btn-primary">
              Anuluj
            </button>
            <button onClick={handleAddDoc} className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
