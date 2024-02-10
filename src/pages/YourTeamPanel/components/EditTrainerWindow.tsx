import React, { Dispatch, SetStateAction, useState } from "react";
import "./addTeamWindow.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import translation from "../../Players/locales/translate.json";
import useFileReader from "../../../hooks/useFileReader";
import useStorage from "../../../hooks/useStorage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import InputImage from "../../../components/InputImage";
import ImagePreview from "../../../components/ImagePreview";
import ButtonContainer from "../../../components/ButtonContainer";
import { useTeams } from "../../Players/hooks/useTeams";
import Select from "react-select";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Trainer } from "./TrainersContainer";
import { translationProps } from "../../../types/translationTypes";

type props = {
  data: Trainer;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

const EditTrainerWindow = ({ data, setSelectedModal }: props) => {
  const { user } = useAuthContext();
  const translate: translationProps = translation;
  const [trainerData, setTrainerData] = useState<Trainer>({
    firstName: data.firstName,
    secondName: data.secondName,
    img: data.img,
    team: data.team,
    uid: data.uid,
  });
  const { language } = useLanguageContext();
  const { id } = useParams();
  const { preview } = useFileReader(trainerData.img);
  const { uploadImage } = useStorage();
  const { teamOptions, handleTeamChange } = useTeams();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { className, value } = e.target;

    setTrainerData((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleClick = () => {
    setSelectedModal(0);
  };
  const handleSubmit = async () => {
    if (!trainerData.firstName || !trainerData.secondName || !trainerData.team) {
      return alert("puste pole");
    } else {
      const docRef = doc(db, "Trainers", data.id as string);
      const downloadURL = await uploadImage(
        trainerData.img,
        `${id || user.uid}/trenerzy/${trainerData.firstName}_${trainerData.secondName}`
      );
      await updateDoc(docRef, { ...trainerData, img: downloadURL?.src });
    }
  };
  return (
    <div className="active-modal">
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input value={trainerData.firstName} className="firstName" onChange={handleValueChange} />
        <label>{translate.lastName[language]}</label>
        <input value={trainerData.secondName} className="secondName" onChange={handleValueChange} />
        <label>{translate.team[language]}</label>
        <Select options={teamOptions} onChange={(e) => handleTeamChange(e?.value as string)} />
        <InputImage setState={setTrainerData} />
        <ImagePreview preview={preview as string} setState={setTrainerData} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default EditTrainerWindow;
