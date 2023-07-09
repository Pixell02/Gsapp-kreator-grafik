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
  return (
    <div>
      {coords && coords.opponentImage && <Radio fabricRef={fabricRef} coords={coords} />}
      {themeOptions && (
        <ThemeOption themeOptions={themeOptions} themeOption={themeOption} setSelectThemes={setSelectThemes} />
      )}
      {coords && coords.additionalText && (
        <AdditionalText fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} />
      )}
      {coords &&
        (coords.yourTeamLogo || coords.yourTeamFirstName || coords.yourTeamSecondName || coords.yourTeamName) && (
          <TeamOption
            fabricRef={fabricRef}
            coords={coords}
            themeOption={themeOption}
            posterBackground={posterBackground}
          />
        )}
      {coords && coords.typeMonth && (
        <TypeMonth
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
        />
      )}
      {coords && coords.typePlace && (
        <TypePlace
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
        />
      )}
      {coords && coords.typeData && (
        <TypeData fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {coords && coords.yourKolejka && (
        <Round fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {coords && coords.yourLeague && (
        <League fabricRef={fabricRef} coords={coords} themeOption={themeOption} posterBackground={posterBackground} />
      )}
      {coords && coords.opponentImage && (
        <OpponentSelect
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Opponents={Opponents}
        />
      )}
      {coords && coords.player && (
        <Player
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Players={Players}
        />
      )}
      {coords && coords.yourPlayerOneGoal && (
        <PlayersGoals
          fabricRef={fabricRef}
          coords={coords}
          themeOption={themeOption}
          posterBackground={posterBackground}
          Players={Players}
        />
      )}
      <StartingSquad
        setIsModalOpen={setIsModalOpen}
        coords={coords}
        
      />
      {coords && coords.yourTeamResult && (
        <Result fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} themeOption={themeOption} />
      )}
    </div>
  );
};

export default SingleElements;
