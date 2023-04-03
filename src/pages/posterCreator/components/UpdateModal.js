import React from "react";
import { useContext } from "react";
import { GlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { useEffect } from "react";
import { BackgroundContext } from "../Context/BackgroundContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ManyBackgroundsContext } from "../Context/ManyBackgroundsContext";

export default function UpdateModal({ isOpen, setIsOpen, defaultBackGround, backgrounds }) {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const { background, image } = useContext(BackgroundContext);
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
  console.log(backgrounds.length)
  const handleAddDoc = async () => {
    if (manyBackgrounds) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const player = ref(storage, `${defaultBackGround.uid}/posters/${defaultBackGround.uuid + backgrounds.length + i}`);

        const uploadTask = uploadBytesResumable(player, background, metadata);

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
                setProgress("dodawanie...");
                break;
            }
          },
          (error) => {
            setProgress(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(db, "yourCatalog"), {
                color: `tło ${backgrounds.length + i + 1}`,
                src: downloadURL,
                uuid: globalProperties.uid,
              });
            });
          }
        );
      });
    }
    updateDoc(doc(db, "yourCatalog", globalProperties.uid), userPoster)
    
    updateDoc(doc(db, "coords", globalProperties.uid), globalProperties);
          setTimeout(() => {
            navigate(`/creator/${globalProperties.uid}`)
          },500)
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
          <label>Typ wzoru</label>
          <select
            name="textAlign"
            className="form-control w-100"
            defaultValue={defaultBackGround ? defaultBackGround.type : "MATCH-POSTER"}
            onChange={(e) =>
              setUserPoster((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
          >
            <option value="MATCH-POSTER">zapowiedź meczu / dzień meczowy</option>
            <option value="RESULT">wynik</option>
            <option value="STARTING-SQUAD">skład wyjściowy</option>
            <option value="GOOOOL">GOL</option>
          </select>
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
