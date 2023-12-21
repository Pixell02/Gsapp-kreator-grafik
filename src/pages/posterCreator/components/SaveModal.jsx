import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import { useBackgroundContext } from "../Context/BackgroundContext";
import "./SaveModal.css";
import Users from "./Users";
import useSearchTeam from "./hooks/useSearchTeam";
import { useLanguageContext } from "../../../context/LanguageContext";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";
import useStorage from "../../../hooks/useStorage";

export default function SaveModal({ setIsOpen }) {
  const { language } = useLanguageContext();
  const navigate = useNavigate();
  const { handleAddImage, progressInfo } = useStorage();
  const [query, setQuery] = useState("");
  const [users, loading, error] = useSearchTeam(query);
  const { image, newBackgrounds } = useBackgroundContext();
  const [radioValue, setRadioValue] = useState("");
  const { globalProperties } = useGlobalPropertiesContext();
  const [name, setName] = useState("");
  console.log(globalProperties);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddDoc = async () => {
    if (newBackgrounds) {
      newBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(
          background.file,
          `${image.uid}/posters/${globalProperties.uid + i + 2}`
        );
        await addDoc(collection(db, "yourCatalog"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
    }
    if (image.file) {
      const downloadURL = await handleAddImage(image.file, `${image.uid}/posters/${image.uuid}`);
      const ref = doc(db, "yourCatalog", globalProperties.uid);
      if (image.additionalLayer) {
        const additionalURL = await handleAddImage(
          image.additionalLayer,
          `${image.uid}/posters/${globalProperties.uid}/${globalProperties.uid}`
        );
        await setDoc(ref, {
          color: image.color,
          name: name,
          src: downloadURL,
          additionalLayer: additionalURL,
          uid: radioValue,
          uuid: globalProperties.uid,
        })
          .then(() => console.log("dodano dod. warstwe"))
          .catch((err) => console.error(err, "błąd"));
      } else {
        await setDoc(ref, {
          color: image.color,
          name: name,
          src: downloadURL,
          uid: radioValue,
          uuid: globalProperties.uid,
        })
          .then(() => console.log("dodano"))
          .catch((err) => console.error(`Error adding document: ${err}`));
      }
    }
    await setDoc(doc(db, "coords", globalProperties.uid), globalProperties)
      .then(() => navigate(`/${language}/creator/${globalProperties.uid}`))
      .catch((err) => console.error(err));
  };

  return (
    <div className="h-100">
      <div className="p-3  d-flex flex-column h-100 w-100">
        <p>Dodaj grafikę</p>
        <label>Znajdź drużynę</label>
        <input type="text" value={query} onChange={(e) => handleQueryChange(e)} />
        <div className="d-flex w-100 border h-100 overflow-auto">
          {loading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
          <Users users={users} radioValue={radioValue} setRadioValue={setRadioValue} />
        </div>
        <label>Nazwa wzoru</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        {progressInfo}
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
}
