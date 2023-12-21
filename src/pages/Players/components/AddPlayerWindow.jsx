import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

import Select from "react-select";
import { useTeams } from "../hooks/useTeams";
import { useLanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json";
import PlayerImagePreview from "./PlayerImagePreview";
import useStorage from "../../../hooks/useStorage";

function AddPlayerWindow({ onClose, Teams }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { handleAddImage } = useStorage();
  const [player, setPlayer] = useState({
    firstName: "",
    secondName: "",
    number: null,
    img: [],
    age: null,
    team: null,
    uid: id || user.uid,
  });
  const handleValueChange = (e) => {
    const { value, className } = e.target;
    setPlayer({ ...player, [className]: value.trim() });
  };
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams);

  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      team: selectedTeam,
    }));
  }, [selectedTeam]);

  const handleSubmit = async () => {
    if (player.firstName === "" || player.secondName === "") {
      alert(translate.emptyField[language]);
    } else if (!player.team) {
      alert(translate.noTeam[language]);
    } else {
      const uploadImages = async () => {
        const images = await Promise.all(
          player.img.map(async (item) => {
            if (item.src === null || item.src === "") return { type: item.type, src: "" };
            else if (typeof item.src === "string") return { type: item.type, src: item.src };
            else if (typeof item.src === "object") {
              const response = await fetch(item.src);
              const blob = await response.blob();
              const downloadURL = await handleAddImage(
                blob,
                `${player.uid}/zawodnik/${player.firstName}_${player.secondName}_${item.type}`
              );

              return {
                type: item.type,
                src: downloadURL,
              };
            }
          })
        );
        return images;
      };
      const images = await uploadImages();
      const ref = collection(db, "Players");
      addDoc(ref, {
        ...player,
        img: images,
      });
      onClose(false);
      setPlayer({
        ...player,
        firstName: "",
        secondName: "",
        number: null,
        team: null,
        age: null,
        image: [
          { type: "basic", src: "" },
          { type: "celebration", src: "" },
        ],
      });
    }
  };
  return ReactDOM.createPortal(
    <div className={"active-modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.firstName} className="firstName" />
        <label>{translate.lastName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.secondName} className="secondName" />
        <label>{translate.birthYear[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.age} className="age" />
        <label>{translate.number[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.number} className="number" />
        <label>{translate.team[language]}</label>
        <Select options={teamOptions} onChange={(e) => handleTeamChange(e.value)} />
        <PlayerImagePreview setPlayer={setPlayer} />
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setPlayer({
                ...player,
                firstName: "",
                secondName: "",
                number: null,
                team: null,
                age: null,
                image: [
                  { type: "basic", src: "" },
                  { type: "celebration", src: "" },
                ],
              });
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
    </div>,
    document.getElementById("portal")
  );
}

export default AddPlayerWindow;
