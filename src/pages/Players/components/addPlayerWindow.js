import { useRef, useState, useEffect, useContext } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useCollection } from "../../../hooks/useCollection";
import Select from "react-select";
import { useTeams } from "./useTeams";
import { LicenseContext } from "../../../context/LicenseContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { addPlayerLog, addPlayerWithImgLog } from "../../stats/components/addLogs";
import translate from "../locales/translate.json";

function AddPlayerWindow({ open, onClose, Teams, email }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const { license } = useContext(LicenseContext);
  const [firstPlayerName, setFirstPlayerName] = useState("");
  const [secondPlayerName, setSecondPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams);

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) {
      if (Math.round(image.size / 1024) < 2000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
        alert("maksymalna wielkość obrazu to 2MB");
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstPlayerName || !secondPlayerName) {
      alert(translate.emptyField[language]);
    } else if (!selectedTeam) {
      alert(translate.noTeam[language]);
    } else {
      if (image) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const player = ref(storage, `${user.uid}/zawodnicy/${firstPlayerName}_${secondPlayerName}`);

        const uploadTask = uploadBytesResumable(player, image, metadata);

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
              addDoc(collection(db, "Players"), {
                firstName: firstPlayerName.trim(),
                secondName: secondPlayerName.trim(),
                img: downloadURL || "",
                number: number || "",
                team: selectedTeam,
                uid: id ? id : user.uid,
              });
            });
            if (license.type === "admin") {
              addPlayerWithImgLog(user, firstPlayerName, secondPlayerName, selectedTeam, email);
            }
          }
        );
      } else {
        addDoc(collection(db, "Players"), {
          firstName: firstPlayerName.trim(),
          secondName: secondPlayerName.trim(),
          img: "",
          number: number || "",
          team: selectedTeam,
          uid: id ? id : user.uid,
        });
        if (license && license.type === "admin") {
          addPlayerLog(user, firstPlayerName, secondPlayerName, selectedTeam, email);
        }
      }
    }
    onClose(false);
    setFirstPlayerName("");
    setSecondPlayerName("");
    setNumber("");
    setImage(null);
  };
  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input
          type="text"
          onChange={(e) => setFirstPlayerName(e.target.value)}
          value={firstPlayerName}
          className="firstPlayerName"
        />

        <label>{translate.lastName[language]}</label>
        <input
          type="text"
          onChange={(e) => setSecondPlayerName(e.target.value)}
          value={secondPlayerName}
          className="secondPlayerName"
        />
        <label>{translate.number[language]}</label>
        <input type="number" onChange={(e) => setNumber(e.target.value)} value={number} className="Number" />

        <>
          <label>{translate.team[language]}</label>
          <Select options={teamOptions} onChange={(e) => handleTeamChange(e.value)} />
        </>

        <button onClick={onButtonClick} className="btn primary-btn add-img">
          {translate.addPhoto[language]}
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
              setFirstPlayerName("");
              setSecondPlayerName("");
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

export default AddPlayerWindow;
