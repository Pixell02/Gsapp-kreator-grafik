import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import useStorage from "../../../hooks/useStorage";
import { useBackgroundContext } from "../Context/BackgroundContext";
import { useLanguageContext } from "../../../context/LanguageContext";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";

export default function UpdateModal({ setIsOpen }) {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const { image, setImage, backgrounds, newBackgrounds } = useBackgroundContext();
  const { handleAddImage, progressInfo } = useStorage();
  const { globalProperties } = useGlobalPropertiesContext();
  console.log(image, backgrounds);
  const handleAddDoc = async () => {
    if (newBackgrounds) {
      newBackgrounds.forEach(async (background, i) => {
        const downloadURL = await handleAddImage(
          background.file,
          `${image.uid}/posters/${image.uuid + backgrounds.length + i}`
        );
        addDoc(collection(db, "yourCatalog"), {
          color: background.color,
          src: downloadURL,
          uuid: globalProperties.uid,
        });
      });
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
    if (image.file) {
      const downloadURL = await handleAddImage(image.file, `${image.uid}/posters/${globalProperties.uid}`);

      await updateDoc(doc(db, "yourCatalog", globalProperties.id), {
        color: image.color,
        src: downloadURL,
      }).then(() => {
        setDoc(doc(db, "coords", globalProperties.id), globalProperties);
      });
    } else {
      await updateDoc(doc(db, "yourCatalog", globalProperties.id), {
        color: image.color,
      }).then(() => {
        console.log("Aktulizowane");
      });
    }
    await setDoc(doc(db, "coords", globalProperties.id), globalProperties);
    navigate(`/${language}/creator/${globalProperties.uid}`);
  };

  return (
    <div className="h-100">
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
}
