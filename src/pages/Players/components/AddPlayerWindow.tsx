import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

import Select from "react-select";
import { useTeams } from "../hooks/useTeams";
import { useLanguageContext } from "../../../context/LanguageContext";
import translation from "../locales/translate.json";
import PlayerImagePreview from "./PlayerImagePreview";
import useStorage from "../../../hooks/useStorage";
import { translationProps } from "../../../types/translationTypes";
import { Player, PlayerImage } from "../../../types/teamTypes";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

function AddPlayerWindow({ setSelectedModal }: props) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const translate: translationProps = translation;
  const { language } = useLanguageContext();
  const { handleAddImage } = useStorage();
  const [player, setPlayer] = useState<Player>({
    firstName: "",
    secondName: "",
    number: null,
    img: [],
    age: null,
    team: "",
    uid: id || user.uid,
  });
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setPlayer({ ...player, [className]: value.trim() });
  };
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams();

  useEffect(() => {
    setPlayer(
      (prev) =>
        ({
          ...prev,
          team: selectedTeam,
        } as Player)
    );
  }, [selectedTeam]);

  const handleSubmit = async () => {
    if (player.firstName === "" || player.secondName === "") {
      alert(translate.emptyField[language]);
    } else if (player.team === "") {
      alert(translate.noTeam[language]);
    } else {
      const uploadImages = async () => {
        const images = await Promise.all(
          (player.img as PlayerImage[]).map(async (item) => {
            if (item.src === null || item.src === "") return { type: item.type, src: "" };
            else if (typeof item.src === "string") return { type: item.type, src: item.src };
            else if (typeof item.src === "object") {
              const downloadURL = await handleAddImage(
                item.src,
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
      setSelectedModal(0);
    }
  };
  return (
    <div className={"active-modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.firstName} className="firstName" />
        <label>{translate.lastName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.secondName} className="secondName" />
        <label>{translate.birthYear[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.age || undefined} className="age" />
        <label>{translate.number[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.number || undefined} className="number" />
        <label>{translate.team[language]}</label>
        <Select options={teamOptions} onChange={(e) => handleTeamChange(e?.value as string)} />
        <PlayerImagePreview player={player} setPlayer={setPlayer} />
        <div className="buttons-container">
          <button
            onClick={() => {
              setSelectedModal(0);
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
