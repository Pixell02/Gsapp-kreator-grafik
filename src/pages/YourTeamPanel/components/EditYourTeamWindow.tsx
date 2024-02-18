import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./addTeamWindow.css";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import updateData from "../EditYourTeamWindow/updateData";
import translation from "./locales/yourTeamPanel.json";
import deleteData from "../EditYourTeamWindow/deleteData";
import { useLanguageContext } from "../../../context/LanguageContext";
import ImagePreview from "../../../components/ImagePreview";
import useStorage from "../../../hooks/useStorage";
import useFileReader from "../../../hooks/useFileReader";
import ColorSelect from "./ColorSelect";
import { Team } from "../../../types/teamTypes";
import { translationProps } from "../../../types/translationTypes";
import InputImage from "../../../components/InputImage";

const options = [
  { value: "piłka nożna", label: "piłka nożna" },
  { value: "siatkówka", label: "siatkówka" },
  { value: "koszykówka", label: "koszykówka" },
  { value: "piłka ręczna", label: "piłka ręczna" },
  { value: "hokej", label: "hokej" },
];

type props = {
  data: Team;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

function EditYourTeamWindow({ data, setSelectedModal }: props) {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const translate: translationProps = translation;
  const [teamData, setTeamData] = useState<Team>({
    firstName: data.firstName,
    secondName: data.secondName,
    sport: data.sport,
    color: data.color || null,
    img: data.img,
    uid: user.uid,
  });
  const { preview } = useFileReader(teamData.img);
  const { handleAddImage } = useStorage();
  const [oldName] = useState(data.firstName + " " + data.secondName);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { className, value } = e.target;
    setTeamData((prev) => ({ ...prev, [className]: value.trim() }));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      alert("puste pole");
    } else {
      const uploadImage = async () => {
        const item = teamData.img;
        if (!item || item === null || item === "") {
          return { img: item };
        } else if (typeof item === "string") {
          return { img: item };
        } else if (typeof item === "object") {
          const downloadURL = await handleAddImage(
            item,
            `${teamData.uid}/herb/${teamData.firstName}_${teamData.secondName}`
          );
          return {
            img: downloadURL,
          };
        }
      };
      const image = await uploadImage();
      const docRef = doc(db, "Teams", data.id as string);
      updateDoc(docRef, { ...teamData, img: image?.img });
      updateData(user.uid, oldName, teamData.firstName, teamData.secondName);

      setSelectedModal(0);
    }
  };

  return (
    <div className="active-modal mg-edit">
      <div className="add-window mt-5">
        <label>{translate.firstTeamName[language]}</label>
        <input type="text" onChange={handleValueChange} value={teamData.firstName} className="firstName" />

        <label>{translate.secondTeamName[language]}</label>
        <input type="text" onChange={handleValueChange} value={teamData.secondName} className="secondName" />
        <label>{translate.discipline[language]}</label>

        <select
          name="country"
          className="form-control"
          value={teamData.sport}
          onChange={(e) => setTeamData((prev) => ({ ...prev, sport: e.target.value }))}
          required
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <ColorSelect teamData={teamData} setTeamData={setTeamData} />
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          {translate.addLogo[language]}
        </button>
        <InputImage setState={setTeamData} />

        <ImagePreview preview={preview as string} setState={setTeamData} />
        <div className="buttons-container">
          <button
            className="btn"
            onClick={() => {
              deleteData(user.uid, oldName);
              const docRef = doc(db, "Teams", data.id as string);
              deleteDoc(docRef);
              setSelectedModal(0);
            }}
          >
            {translate.delete[language]}
          </button>
          <button
            onClick={() => {
              setSelectedModal(0);
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
