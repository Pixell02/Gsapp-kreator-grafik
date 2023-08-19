import React from "react";
import { useContext } from "react";
import { GlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ManyBackgroundsContext } from "../Context/ManyBackgroundsContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function UpdateModal({ isOpen, setIsOpen, defaultBackGround, backgrounds }) {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useContext(LanguageContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [userPoster, setUserPoster] = useState(defaultBackGround);
  const [progressInfo, setProgress] = useState("");
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  useEffect(() => {
    setUserPoster((prevState) => ({
      ...prevState,
      color: "tło 1"
    }))
  }, [manyBackgrounds])
  useEffect(() => {
    setGlobalProperties(prev => ({
      ...prev,
      uid: params.id
    }))
  }, [setGlobalProperties, params])
  const handleAddDoc = async () => {
    if (manyBackgrounds) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const player = ref(storage, `${defaultBackGround.uid}/posters/${defaultBackGround.uuid + backgrounds.length + i}`);
        
        const uploadTask = uploadBytesResumable(player, background.file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                setProgress("Upload is paused");
                break;
              case "running":
                setProgress("Upload is " + progress + "% done");
                break;
              default: console.log("default");
            }
          },
          (error) => {
            setProgress(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(db, "yourCatalog"), {
                color: background.color,
                src: downloadURL,
                uuid: globalProperties.uid,
              });
            });
          }
        );
      });
      updateDoc(doc(collection(db, "yourCatalog"), globalProperties.uid), userPoster)
    
      setDoc(doc(collection(db, "coords"), globalProperties.uid), globalProperties);
      setTimeout(() => {
        navigate(`/${language}/creator/${globalProperties.uid}`)
      }, 500)
    } else {
    
      // updateDoc(doc(collection(db, "yourCatalog"), globalProperties.uid), userPoster)
    
      setDoc(doc(collection(db, "coords"), globalProperties.id), globalProperties);
      // setDoc(doc(collection(db, "coords"), id), globalProperties ? globalProperties : { uid: id });
        navigate(`/${language}/creator/${globalProperties.uid}`)
    
    }
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
