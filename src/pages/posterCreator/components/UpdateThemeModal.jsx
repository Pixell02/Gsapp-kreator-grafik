import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import useStorage from "../../../hooks/useStorage";
import { useBackgroundContext } from "../Context/BackgroundContext";
import "./saveThemeModal.css";
import { useLanguageContext } from "../../../context/LanguageContext";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";

const UpdateThemeModal = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const { image, setImage, backgrounds, newBackgrounds: manyBackgrounds } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const { handleAddImage, progressInfo } = useStorage();
  const [catalog, setCatalog] = useState(null);
  useEffect(() => {
    const docRef = doc(db, "catalog", image.themeId || "");
    getDoc(docRef).then((doc) => {
      setCatalog(doc.data());
    });
  }, [image]);
  const handleAddDoc = async () => {
    if (manyBackgrounds?.length > 0) {
      manyBackgrounds.forEach(async (background) => {
        const downloadURL = await handleAddImage(
          background.file,
          `${catalog.theme + " " + catalog.sport + " " + catalog.lang}/${image.name}/${background.color}`
        );
        await addDoc(collection(db, "piecesOfPoster"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
    }
    if (backgrounds) {
      backgrounds.forEach(async (item, i) => {
        if (i !== 0 && typeof item.src === "string") {
          await updateDoc(doc(db, "piecesOfPoster", item.id), {
            color: item.color,
          });
        }
      });
    }
    if (typeof image?.src !== "string" && image) {
      const downloadURL = await handleAddImage(
        image.file,
        `${catalog.theme + " " + catalog.sport + " " + catalog.lang}/${image.name}/${image.color}`
      );

      await updateDoc(doc(db, "piecesOfPoster", image.id), {
        color: image.color,
        src: downloadURL,
      }).then(() => {
        const ref = doc(db, "coords", globalProperties.id);
        delete globalProperties.id;
        updateDoc(ref, globalProperties);
      });
    } else {
      if (image?.color) {
        await updateDoc(doc(db, "piecesOfPoster", image.id), {
          color: image.color,
        }).then(() => {
          const ref = doc(db, "coords", globalProperties.id);
          delete globalProperties.id;
          updateDoc(ref, globalProperties);
        });
      }
    }
    navigate(`/${language}/creator/theme/${globalProperties.uid}`);
  };

  return (
    <div className="mt-3 h-100">
      <div className="p-3  d-flex flex-column h-100 w-100">
        <p>Aktualizuj grafikę</p>

        <label>Nazwa wzoru</label>
        <input
          type="text"
          value={image.name}
          onChange={(e) =>
            setImage((prevState) => ({
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
  );
};

export default UpdateThemeModal;
