import React from "react";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalPropertiesContext } from "../../posterCreator/Context/GlobalProperitesContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/useCollection";
import "./saveThemeModal.css";
import { useEffect } from "react";

const UpdateThemeModal = ({ isOpen, setIsOpen, defaultBackGround }) => {
  const navigate = useNavigate();
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [userPoster, setUserPoster] = useState(defaultBackGround);
  const [progressInfo, setProgress] = useState();
  const { globalProperties } = useContext(GlobalPropertiesContext);
  const [percentageProgress, setPercentageProgress] = useState();
  const [catalog, setCatalog] = useState();
  console.log(globalProperties)
  useEffect(() => {
    const docRef = doc(db, "catalog", userPoster.themeId);
    getDoc(docRef).then((doc) => {
      setCatalog(doc.data());
    });
  }, [userPoster]);
  console.log(manyBackgrounds)
  const handleAddDoc = async () => {
    if (manyBackgrounds) {
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

    updateDoc(
      doc(collection(db, "coords"), globalProperties.uid),
      globalProperties ? globalProperties : { uid: globalProperties.uid }
    );
    setTimeout(() => {
      navigate(`/creator/theme/${globalProperties.uid}`);
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
