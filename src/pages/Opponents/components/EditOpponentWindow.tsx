import { Dispatch, SetStateAction } from "react";
import ImagePreview from "../../../components/ImagePreview";
import useFileReader from "../../../hooks/useFileReader";
import "../../YourTeamPanel/components/addTeamWindow.css";
import useOpponents from "../hooks/useOpponents";
import translation from "../locales/locales.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Opponent } from "../../../types/teamTypes";
import { translationProps } from "../../../types/translationTypes";
import { useTeams } from "../../Players/hooks/useTeams";
import ButtonContainer from "../../../components/ButtonContainer";
import InputImage from "../../../components/InputImage";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
  data: Opponent;
};

function EditOpponentWindow({ data, setSelectedModal }: props) {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(data?.team);

  const { handleSubmit, opponent, setOpponent, handleValueChange } = useOpponents(data);
  const { preview } = useFileReader(opponent.img);

  return (
    <div className="active-modal m-edit">
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
        <select
          name="country"
          className="form-control"
          value={selectedTeam}
          defaultValue={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value=""></option>
          {teamOptions && teamOptions.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>
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

export default EditOpponentWindow;
