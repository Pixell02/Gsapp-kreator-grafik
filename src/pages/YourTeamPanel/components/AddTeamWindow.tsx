import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Select, { SingleValue } from "react-select";
import { sportOptions } from "../../../components/options";
import { useParams } from "react-router-dom";
import translation from "./locales/yourTeamPanel.json";
import useStorage from "../../../hooks/useStorage";
import ImagePreview from "../../../components/ImagePreview";
import useFileReader from "../../../hooks/useFileReader";
import InputImage from "../../../components/InputImage";
import ButtonContainer from "../../../components/ButtonContainer";
import { useLanguageContext } from "../../../context/LanguageContext";
import ColorSelect from "./ColorSelect";
import { translationProps } from "../../../types/translationTypes";
import { Team } from "../../../types/teamTypes";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

function AddTeamWindow({ setSelectedModal }: props) {
  const { user } = useAuthContext();
  const { id } = useParams();
  const translate: translationProps = translation;
  const [teamData, setTeamData] = useState<Team>({
    firstName: "",
    secondName: "",
    img: "",
    sport: "",
    uid: id || user.uid,
  });
  const { language } = useLanguageContext();
  const { uploadImage } = useStorage();
  const { preview } = useFileReader(teamData.img);

  const getSport = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option?.value) return;
    setTeamData((prev) => ({
      ...prev,
      sport: option.value,
    }));
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { className, value } = e.target;
    setTeamData((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!teamData.firstName || !teamData.secondName || teamData.sport === "") {
      return alert("puste pole");
    } else {
      const downloadURL = await uploadImage(
        teamData.img,
        `${id || user.uid}/herb/${teamData.firstName}_${teamData.secondName}`
      );
      await addDoc(collection(db, "Teams"), {
        ...teamData,
        img: downloadURL?.src,
      });

      setSelectedModal(0);
    }
  };
  const handleClick = () => {
    setSelectedModal(0);
  };

  return (
    <div className="active-modal">
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstTeamName[language]}</label>
        <input type="text" onChange={handleChangeValue} value={teamData.firstName} className="firstName" required />
        <label>{translate.secondTeamName[language]}</label>
        <input type="text" onChange={handleChangeValue} value={teamData.secondName} className="secondName" required />
        <label>{translate.discipline[language]}</label>
        <Select options={sportOptions} onChange={getSport} />
        <ColorSelect teamData={teamData} setTeamData={setTeamData} />
        <InputImage setState={setTeamData} />
        <ImagePreview preview={preview as string} setState={setTeamData} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddTeamWindow;
