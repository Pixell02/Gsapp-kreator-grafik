import { useRef, useState } from "react";
import "./addTeamWindow.css";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import updateData from "../EditYourTeamWindow/updateData";
import translate from "./locales/yourTeamPanel.json";
import deleteData from "../EditYourTeamWindow/deleteData";
import { useLanguageContext } from "../../../context/LanguageContext";
import ImagePreview from "../../../components/ImagePreview";
import useStorage from "../../../hooks/useStorage";
import useFileReader from "../../../hooks/useFileReader";
import ColorSelect from "./ColorSelect";

const options = [
  { value: "piłka nożna", label: "piłka nożna" },
  { value: "siatkówka", label: "siatkówka" },
  { value: "koszykówka", label: "koszykówka" },
  { value: "piłka ręczna", label: "piłka ręczna" },
  { value: "hokej", label: "hokej" },
];
function EditYourTeamWindow({ data, open, onClose }) {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const [teamData, setTeamData] = useState({
    firstName: data.firstName,
    secondName: data.secondName,
    sport: data.sport,
    color: data.color || null,
    img: data.img,
    uid: user.uid,
  });
  const { preview, setPreview } = useFileReader(teamData.img);
  const { handleAddImage } = useStorage();
  const [oldName] = useState(data.firstName + " " + data.secondName);

  const handlePreviewDelete = () => {
    setPreview(null);
    setTeamData((prev) => ({ ...prev, img: "" }));
  };

  const handleValueChange = (e) => {
    const { className, value } = e.target;
    setTeamData((prev) => ({ ...prev, [className]: value.trim() }));
  };

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleEdit = (e) => {
    const file = e.target.files[0];
    setTeamData((prev) => ({ ...prev, img: file }));
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
      const docRef = doc(db, "Teams", data.id);
      updateDoc(docRef, { ...teamData, img: image.img });
      updateData(user.uid, oldName, teamData.firstName, teamData.secondName);

      onClose();
    }
  };

  return (
    <div className={open ? "active-modal mg-edit" : "modal"}>
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
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/png"
          onChange={(e) => {
            handleEdit(e);
          }}
        />
        <ImagePreview preview={preview} setPreview={handlePreviewDelete} />
        <div className="buttons-container">
          <button
            className="btn"
            onClick={() => {
              deleteData(user.uid, oldName);
              const docRef = doc(db, "Teams", data.id);
              deleteDoc(docRef);
              onClose();
            }}
          >
            {translate.delete[language]}
          </button>
          <button
            onClick={() => {
              onClose();
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
