import React from "react";
import Radio from "./SingleElements/Radio";
import ThemeOption from "./SingleElements/ThemeOption";
import AdditionalText from "./SingleElements/AdditionalText";
import TeamOption from "./SingleElements/TeamOption";
import TypeMonth from "./SingleElements/TypeMonth";
import TypePlace from "./SingleElements/TypePlace";
import TypeData from "./SingleElements/TypeData";
import Round from "./SingleElements/Round";
import League from "./SingleElements/League";
import OpponentSelect from "./SingleElements/OpponentSelect";
import Player from "./SingleElements/Player";
import PlayersGoals from "./SingleElements/PlayersGoals";
import StartingSquad from "./SingleElements/StartingSquad";
import Result from "./SingleElements/Result";
import TextInput from "./SingleElements/TextInput";
import TextBoxInput from "./SingleElements/TextBoxInput";

const SingleElements = ({
  coords,
  fabricRef,
  themeOptions,
  themeOption,
  posterBackground,
  setSelectThemes,
  Opponents,
  Players,
  setIsModalOpen,
}) => {
  console.log(coords)
  return (
    <div>
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && <Radio fabricRef={fabricRef} coords={coords} />}
      {themeOptions && (
        <ThemeOption themeOptions={themeOptions} themeOption={themeOption} setSelectThemes={setSelectThemes} />
      )}
      {coords.additionalText && (
        <AdditionalText fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} />
      )}
      {(coords.yourTeamLogo || coords.yourTeamFirstName || coords.yourTeamSecondName || coords.yourTeamName) && (
        <TeamOption
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
        />
      )}
      {coords.typeMonth && (
        <TypeMonth
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
        />
      )}
      {coords.typePlace && (
        <TypePlace
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
        />
      )}
      {coords.typeData && (
        <TypeData fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {coords.yourKolejka && (
        <Round fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {coords.yourLeague && (
        <League fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <OpponentSelect
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Opponents={Opponents}
        />
      )}
      {coords.yourTeamResult && (
        <Result fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} themeOption={themeOption} />
      )}
      {coords.player && (
        <Player
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Players={Players}
        />
      )}
      {coords.Text &&
        coords.Text.map((coords) => (
          <TextInput
            fabricRef={fabricRef}
            coords={coords}
            themeOption={themeOption}
            posterBackground={posterBackground}
          />
        ))}
      {coords.TextBox && coords.TextBox.map((coords) => (
        <TextBoxInput
        fabricRef={fabricRef}
        coords={coords}
        themeOption={themeOption}
        posterBackground={posterBackground}
        />
      ))}

      {coords.yourPlayerOneGoal && (
        <PlayersGoals
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Players={Players}
        />
      )}
      <StartingSquad setIsModalOpen={setIsModalOpen} coords={coords} />
    </div>
  );
};

export default SingleElements;
