import { useRef, useState, useEffect, useContext } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useTeams } from "../../Players/components/useTeams";
import Select from "react-select";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/locales.json";

function AddOpponentWindow({ open, onClose, Teams }) {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [firstOpponentName, setFirstOpponentName] = useState("");
  const [secondOpponentName, setSecondOpponentName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams);
  const { user } = useAuthContext();

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) {
      if (Math.round(image.size / 1024) < 1000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
        alert(translate.maxSize[language]);
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstOpponentName || !secondOpponentName) {
      alert(translate.emptyField[language]);
    } else if (!selectedTeam) {
      alert(translate.noTeam[language]);
    } else {
      if (preview) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const storageRef = ref(storage, `${user.uid}/przeciwnicy/${firstOpponentName}_${secondOpponentName}`);

        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const docRef = collection(db, "Opponents");
              addDoc(docRef, {
                firstName: firstOpponentName.trim(),
                secondName: secondOpponentName.trim(),
                img: downloadURL,
                uid: id ? id : user.uid,
                team: selectedTeam,
              });
            });
          }
        );
      } else {
        const docRef = collection(db, "Opponents");
        addDoc(docRef, {
          firstName: firstOpponentName.trim(),
          secondName: secondOpponentName.trim(),
          img: "",
          uid: id ? id : user.uid,
          team: selectedTeam,
        });
      }
      onClose(true);
      setFirstOpponentName("");
      setSecondOpponentName("");
      setImage(null);
    }
  };
  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window">
        <label>{translate.firstOpponentName[language] }</label>
        <input
          type="text"
          onChange={(e) => setFirstOpponentName(e.target.value)}
          value={firstOpponentName}
          className="firstOpponentName"
          required
        />
        <label>{translate.secondOpponentName[language] }</label>
        <input
          type="text"
          onChange={(e) => setSecondOpponentName(e.target.value)}
          value={secondOpponentName}
          className="secondOpponentName"
          required
        />

        <>
          <label>{translate.team[language]}</label>
          <Select options={teamOptions} onChange={(e) => handleTeamChange(e.value)} />
        </>

        <button onClick={onButtonClick} className="btn primary-btn add-img">
          {translate.addCrest[language]}
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/png"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        <div className="add-logo-window">
          <div className="image-container">{preview && <img src={preview} className="image" />}</div>
          <div className="bin-container">{preview && <img src={bin} onClick={() => setPreview(null)} />}</div>
        </div>

        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setFirstOpponentName("");
              setSecondOpponentName("");
              setImage(null);
            }}
            className="btn primary-btn"
          >
            {translate.cancel[language]}
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
            {translate.save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOpponentWindow;
