import React from "react";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalPropertiesContext } from "../../posterCreator/Context/GlobalProperitesContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../../../firebase/config";
import "./saveThemeModal.css";
import { useEffect } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

const UpdateThemeModal = ({ isOpen, setIsOpen, defaultBackGround }) => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [userPoster, setUserPoster] = useState(defaultBackGround);
  const { globalProperties } = useContext(GlobalPropertiesContext);
  const [percentageProgress, setPercentageProgress] = useState();
  const [catalog, setCatalog] = useState();
  useEffect(() => {
    const docRef = doc(db, "catalog", userPoster.themeId);
    getDoc(docRef).then((doc) => {
      setCatalog(doc.data());
    });
  }, [userPoster]);
  const handleAddDoc = async () => {
    if (manyBackgrounds?.length > 0) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const player = ref(
          storage,
          `${catalog.theme + " " + catalog.sport + " " + catalog.lang}/${userPoster.name}/${background.name}`
        );

        const uploadTask = uploadBytesResumable(player, background.file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentageProgress("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("dodawanie...");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(db, "piecesOfPoster"), {
                color: background.name,
                src: downloadURL,
                uuid: globalProperties.uid,
              });
            });
          }
        );
      });
    }
    const docRef = doc(db, "coords", globalProperties.id)
    const data = globalProperties ? globalProperties : { uid: globalProperties.id };
    setDoc(docRef, data);
    setTimeout(() => {
      navigate(`/${language}/creator/theme/${globalProperties.uid}`);
    }, 500);
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
            onChange={(e) =>
              setUserPoster((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          {percentageProgress && <span>{percentageProgress}</span>}
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
};

export default UpdateThemeModal;
