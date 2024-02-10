import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./addTeamWindow.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import translation from "../../Players/locales/translate.json";
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
import { translationProps } from "../../../types/translationTypes";
import { Trainer } from "./TrainersContainer";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

const AddTrainerWindow = ({ setSelectedModal }: props) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const translate: translationProps = translation;

  const { language } = useLanguageContext();
  const [trainerData, setTrainerData] = useState<Trainer>({
    firstName: "",
    secondName: "",
    team: "",
    img: "",
    uid: user.uid,
  });
  const { preview, setPreview } = useFileReader(trainerData.img);
  const { uploadImage } = useStorage();
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams();

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
    if (!trainerData.firstName || !trainerData.secondName || !selectedTeam) {
      return alert("puste pole");
    } else {
      const docRef = collection(db, "Trainers");
      const downloadURL = await uploadImage(
        trainerData.img,
        `${id || user.uid}/trenerzy/${trainerData.firstName}_${trainerData.secondName}`
      );
      await addDoc(docRef, {
        ...trainerData,
        img: downloadURL?.src,
      });

      setSelectedModal(0);
    }
  };
  const handleReadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTrainerData((prev) => ({ ...prev, img: file }));
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
        <InputImage handleReadFile={handleReadFile} />
        <ImagePreview preview={preview} setPreview={setPreview} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddTrainerWindow;
