import { useContext, useRef, useState } from "react";
import ImagePreview from "../../../components/ImagePreview";
import { LanguageContext } from "../../../context/LanguageContext";
import useFileReader from "../../../hooks/useFileReader";
import "../../YourTeamPanel/components/addTeamWindow.css";
import useOpponents from "../hooks/useOpponents";
import translate from "../locales/locales.json";

function EditOpponentWindow({ player, open, onClose, Teams }) {
  const { language } = useContext(LanguageContext);
  const elements = [
    { name: translate.firstOpponentName[language], className: "firstName" },
    { name: translate.secondOpponentName[language], className: "secondName" },
  ];

  const [image, setImage] = useState(player.img);
  const {
    handleSubmit,
    opponent,
    teamOptions,
    handleTeamChange,
    setOpponent,
    handleValueChange,
    selectedTeam,
  } = useOpponents(Teams, image, player);
  const { preview, setPreview } = useFileReader(image);

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={open ? "active-modal m-edit" : "modal"}>
      <div className="add-window">
        {elements.map((item, i) => (
          <>
            <label key={i}>{item.name}</label>
            <input
              type="text"
              onChange={(e) => handleValueChange(e, item.className)}
              value={opponent[item.className]}
              className={item.className}
              required
            />
          </>
        ))}

        <label>{translate.team[language]}</label>
        <select
          name="country"
          className="form-control"
          value={selectedTeam}
          defaultValue={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value=""></option>
          {teamOptions &&
            teamOptions.map((team) => (
              <option value={team.value}>{team.label}</option>
            ))}
        </select>
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          {translate.addCrest[language]}
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
        <ImagePreview
          preview={preview || image}
          setPreview={image ? setImage : setPreview}
        />
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setOpponent(null);
              setImage(null);
            }}
            className="btn primary-btn"
          >
            {translate.cancel[language]}
          </button>
          <button
            onClick={(e) => {
              handleSubmit(e);
              onClose();
              setImage(null);
            }}
            className="btn primary-btn"
          >
            {translate.save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditOpponentWindow;
