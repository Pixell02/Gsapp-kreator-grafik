import { useRef, useState, useEffect } from "react";
import "./addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";
import Select from "react-select";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import useEditModal from "../../../hooks/useEditModal";
import updateData from "../EditYourTeamWindow/updateData";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "./locales/yourTeamPanel.json"

const options = [
  { value: "piłka nożna", label: "piłka nożna" },
  { value: "siatkówka", label: "siatkówka" },
  { value: "koszykówka", label: "koszykówka" },
  { value: "piłka ręczna", label: "piłka ręczna" },
  { value: "hokej", label: "hokej" },
];
function EditYourTeamWindow({ yourTeam, open, onClose }) {
  const { language } = useContext(LanguageContext);
  const { user } = useAuthContext();
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const [firstTeamName, setFirstTeamName] = useState(yourTeam.firstName);
  const [secondTeamName, setSecondTeamName] = useState(yourTeam.secondName);
  const [isImage, setIsImage] = useState(true);
  const [sport, setSport] = useState(yourTeam.sport);
  const [image, setImage] = useState(yourTeam.img);
  const [preview, setPreview] = useState(yourTeam.img);
  const [oldName] = useState(yourTeam.firstName + " " + yourTeam.secondName);

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleEdit = (e) => {
    setIsImage(false);
    const file = e.target.files[0];
    if (file.size > 1000000) {
      alert("Maksymalny rozmiar obrazu to 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstTeamName) {
      alert("puste pole");
    } else if (!secondTeamName) {
      alert("puste pole");
    } else {
      if (!isImage) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const player = ref(
          storage,
          `${user.uid}/herb/${firstTeamName}_${secondTeamName}`
        );

        const uploadTask = uploadBytesResumable(player, image, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                const docRef = doc(db, "Teams", yourTeam.id);
                updateDoc(docRef, {
                  firstName: firstTeamName.trim(),
                  secondName: secondTeamName.trim(),
                  img: downloadURL,
                  sport: sport,
                });
                updateData(user.uid, oldName, firstTeamName, secondTeamName)
              }
            );
          }
        );
      } else {
        const docRef = doc(db, "Teams", yourTeam.id);
        updateDoc(docRef, {
          firstName: firstTeamName.trim(),
          secondName: secondTeamName.trim(),
          sport: sport,
        });
        updateData(user.uid, oldName, firstTeamName, secondTeamName);
      }
      onClose();
      setFirstTeamName("");
      setSecondTeamName(null);
      setImage(null);
    }
  };

  return (
    <div className={open ? "active-modal mg-edit" : "modal"}>
      <div className="add-window mt-5">
        <label>{translate.firstTeamName[language]}</label>
        <input
          type="text"
          onChange={(e) => setFirstTeamName(e.target.value)}
          value={firstTeamName}
          className="firstPlayerName"
        />

        <label>{translate.secondTeamName[language]}</label>
        <input
          type="text"
          onChange={(e) => setSecondTeamName(e.target.value)}
          value={secondTeamName}
          className="Number"
        />
        <label>{translate.discipline[language]}</label>

        <select
          name="country"
          className="form-control"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          required
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>

        <button onClick={onButtonClick} className="btn primary-btn add-img">
        {translate.addLogo[language]}
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/png"
          onChange={(e) => {
            handleEdit(e);
          }}
        />
        <div className="add-logo-window">
          <div className="image-container">
            {preview && <img src={preview} />}
          </div>
          <div className="bin-container">
            {preview && <img src={bin} onClick={() => setPreview(null)} />}
          </div>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setFirstTeamName("");
              setSecondTeamName("");
              setImage(null);
            }}
            className="btn primary-btn"
          >
            {translate.Cancel[language]}
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
          {translate.Save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditYourTeamWindow;
