import React, { useState } from "react";
import "./addTeamWindow.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import translate from "../../Players/locales/translate.json";
import InputImage from "../../../components/InputImage";
import ImagePreview from "../../../components/ImagePreview";
import ButtonContainer from "../../../components/ButtonContainer";
import useFileReader from "../../../hooks/useFileReader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import useStorage from "../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useTeams } from "../../Players/hooks/useTeams";
import { useLanguageContext } from "../../../context/LanguageContext";

const AddTrainerWindow = ({ Team, open, onClose }) => {
  const { user } = useAuthContext();
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const { language } = useLanguageContext();
  const { preview, setPreview } = useFileReader(image || null);
  const { handleAddImage } = useStorage();
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Team);
  const [trainerData, setTrainerData] = useState({
    firstName: "",
    secondName: "",
    img: "",
    uid: user.uid,
  });
  const handleValueChange = (e) => {
    const { className, value } = e.target;

    setTrainerData((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleClick = () => {
    onClose();
    setTrainerData((prev) => ({
      ...prev,
      firstName: "",
      secondName: "",
      team: "",
    }));
    setImage(null);
  };
  const handleSubmit = async () => {
    if (!trainerData.firstName || !trainerData.secondName || !selectedTeam) {
      return alert("puste pole");
    } else {
      const docRef = collection(db, "Trainers");
      if (!preview) {
        addDoc(docRef, {
          ...trainerData,
          team: selectedTeam,
        });
      } else {
        const downloadURL = await handleAddImage(
          image,
          `${id ? id : user.uid}/trenerzy/${trainerData.firstName}_${trainerData.secondName}`
        );
        addDoc(docRef, {
          ...trainerData,
          team: selectedTeam,
          img: downloadURL,
        });
      }
      onClose();
    }
  };

  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input value={trainerData.firstName} className="firstName" onChange={handleValueChange} />
        <label>{translate.lastName[language]}</label>
        <input value={trainerData.secondName} className="secondName" onChange={handleValueChange} />
        <label>{translate.team[language]}</label>
        <Select options={teamOptions} onChange={(e) => handleTeamChange(e.value)} />
        <InputImage setImage={setImage} />
        <ImagePreview preview={preview} setPreview={setPreview} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddTrainerWindow;
