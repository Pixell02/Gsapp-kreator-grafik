import { Dispatch, SetStateAction, useEffect } from "react";
import Select from "react-select";
import ImagePreview from "../../../components/ImagePreview";
import useFileReader from "../../../hooks/useFileReader";
import "../../YourTeamPanel/components/addTeamWindow.css";
import useOpponents from "../hooks/useOpponents";
import translation from "../locales/locales.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import InputImage from "../../../components/InputImage";
import ButtonContainer from "../../../components/ButtonContainer";
import { useTeams } from "../../Players/hooks/useTeams";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

function AddOpponentWindow({ setSelectedModal }: props) {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

  const { handleSubmit, opponent, setOpponent, handleValueChange } = useOpponents();
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams();
  const { preview } = useFileReader(opponent.img);

  useEffect(() => {
    if (selectedTeam === "") return;
    setOpponent((prev) => ({ ...prev, team: selectedTeam }));
  }, [selectedTeam]);

  return (
    <div className="active-modal">
      <div className="add-window">
        <label>{translate.firstOpponentName[language]}</label>
        <input
          type="text"
          onChange={(e) => handleValueChange(e)}
          value={opponent.firstName}
          className="firstName"
          required
        />
        <label>{translate.secondOpponentName[language]}</label>
        <input
          type="text"
          onChange={(e) => handleValueChange(e)}
          value={opponent.secondName}
          className="secondName"
          required
        />

        <label>{translate.team[language]}</label>
        <Select options={teamOptions} onChange={(option) => handleTeamChange(option?.value as string)} />

        <InputImage setState={setOpponent} />
        <ImagePreview preview={preview as string} setState={setOpponent} />
        <ButtonContainer
          handleClick={() => setSelectedModal(0)}
          handleSubmit={() => {
            handleSubmit();
            setSelectedModal(0);
          }}
        />
      </div>
    </div>
  );
}

export default AddOpponentWindow;
