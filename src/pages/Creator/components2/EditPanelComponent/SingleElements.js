import React, { useContext } from "react";
import Radio from "./SingleElements/Radio";
import ThemeOption from "./SingleElements/ThemeOption";
import AdditionalText from "./SingleElements/AdditionalText";
import TeamOption from "./SingleElements/TeamOption";
import OpponentSelect from "./SingleElements/OpponentSelect";
import Player from "./SingleElements/Player";
import PlayersGoals from "./SingleElements/PlayersGoals";
import StartingSquad from "./SingleElements/StartingSquad";
import Result from "./SingleElements/Result";
import TextInput from "./SingleElements/TextInput";
import TextBoxInput from "./SingleElements/TextBoxInput";
import Images from "./SingleElements/Images";
import AdditionalImageLayer from "./SingleElements/AdditionalImageLayer";
import TextLineInput from "./SingleElements/TextLineInput";
import translate from "../../locales/translate.json";
import { LanguageContext } from "../../../../context/LanguageContext";

const SingleElements = ({
  coords,
  fabricRef,
  themeOptions,
  themeOption,
  setSelectThemes,
  Opponents,
  Players,
  setIsModalOpen,
  additionalLayer,
}) => {
  const { language } = useContext(LanguageContext);
  return (
    <div>
      {additionalLayer && <AdditionalImageLayer fabricRef={fabricRef} additionalLayer={additionalLayer} />}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <Radio fabricRef={fabricRef} coords={coords} />
      )}
      {themeOptions && (
        <ThemeOption themeOptions={themeOptions} themeOption={themeOption} setSelectThemes={setSelectThemes} />
      )}
      {coords.additionalText && (
        <AdditionalText fabricRef={fabricRef} coords={coords} />
      )}
      {(coords.yourTeamLogo || coords.yourTeamFirstName || coords.yourTeamSecondName || coords.yourTeamName) && (
        <TeamOption
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
        />
      )}
      {coords.typeMonth && (
        <TextLineInput
          fabricRef={fabricRef}
          themeOption={themeOption}
          coords={coords.typeMonth}
          name={translate.typeMonth[language]}
        />
      )}
      {coords.typePlace && (
        <TextLineInput
          fabricRef={fabricRef}
          themeOption={themeOption}
          coords={coords.typePlace}
          name={translate.typePlace[language]}
        />
      )}
      {coords.typeData && (
        <TextLineInput
          fabricRef={fabricRef}
          themeOption={themeOption}
          coords={coords.typeData}
          name={translate.typeDate[language]}
        />
      )}
      {coords.yourKolejka && (
        <TextLineInput
          fabricRef={fabricRef}
          themeOption={themeOption}
          coords={coords.yourKolejka}
          name={translate.Round[language]}
        />
      )}
      {coords.yourLeague && (
        <TextLineInput
          fabricRef={fabricRef}
          themeOption={themeOption}
          coords={coords.yourLeague}
          name={translate.yourLeague[language]}
        />
      )}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <OpponentSelect
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          Opponents={Opponents}
        />
      )}
      {coords.yourTeamResult && (
        <Result fabricRef={fabricRef} coords={coords} themeOption={themeOption} />
      )}
      {coords.Images?.Image.map((image) => (
        <Images fabricRef={fabricRef} filters={coords.Images.filters} coords={image} />
      ))}
      {(coords.player || coords.playerImage) && (
        <Player
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          Players={Players}
          additionalLayer={additionalLayer}
        />
      )}
      {coords.Text &&
        coords.Text.map((coords) => <TextInput fabricRef={fabricRef} coords={coords} themeOption={themeOption} />)}
      {coords.TextBox &&
        coords.TextBox.map((coords) => (
          <TextBoxInput
            fabricRef={fabricRef}
            coords={coords}
            themeOption={themeOption}
          />
        ))}

      {coords.yourPlayerOneGoal && (
        <PlayersGoals
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          Players={Players}
        />
      )}
      <StartingSquad setIsModalOpen={setIsModalOpen} coords={coords} />
    </div>
  );
};

export default SingleElements;
