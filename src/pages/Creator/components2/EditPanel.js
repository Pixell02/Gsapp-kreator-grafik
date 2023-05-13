import React from "react";
import { RadioProvider } from "../context/radioContext";
import Radio from "./EditPanelComponent/Radio";
import ThemeOption from "./EditPanelComponent/ThemeOption";
import TrainingPlan from "../components/TrainingPlan";
import TypePlace from "./EditPanelComponent/TypePlace";
import Result from "./EditPanelComponent/Result";
import TeamOption from "./EditPanelComponent/TeamOption";
import TypeData from "./EditPanelComponent/TypeData";
import Round from "./EditPanelComponent/Round";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import OpponentSelect from "./EditPanelComponent/OpponentSelect";
import TypeMonth from "./EditPanelComponent/TypeMonth";
import League from "./EditPanelComponent/League";
import Player from "./EditPanelComponent/Player";
import StartingSquad from "./EditPanelComponent/StartingSquad";
import AdditionalText from "./EditPanelComponent/AdditionalText";
import PlayersGoals from "./EditPanelComponent/PlayersGoals";

export default function EditPanel({ fabricRef, coords, themeOption, setSelectThemes, themeOptions, posterBackground }) {
  const { user } = useAuthContext();
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid])
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  
  return (
    <RadioProvider>
      {fabricRef && (
        <>
         
          {coords && coords.opponentImage && <Radio fabricRef={fabricRef} coords={coords} />}
          {themeOptions && (
            <ThemeOption themeOptions={themeOptions} themeOption={themeOption} setSelectThemes={setSelectThemes} />
          )}
           {coords && coords.additionalText && <AdditionalText fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} />}
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
            <TypeData
              fabricRef={fabricRef}
              coords={coords}
              themeOption={themeOption}
              posterBackground={posterBackground}
            />
          )}
          {coords && coords.yourKolejka && (
            <Round
              fabricRef={fabricRef}
              coords={coords}
              themeOption={themeOption}
              posterBackground={posterBackground}
            />
          )}
          {coords && coords.yourLeague && (
            <League
            fabricRef={fabricRef}
            coords={coords}
            themeOption={themeOption}
            posterBackground={posterBackground}
            />
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
            fabricRef={fabricRef}
            coords={coords}
            themeOption={themeOption}
            posterBackground={posterBackground}
            Players={Players}
          />
          {coords && coords.yourTeamResult && (
            <Result fabricRef={fabricRef} coords={coords} posterBackground={posterBackground} themeOption={themeOption} />
          )}
          {coords && coords.dayOne && <TrainingPlan fabricRef={fabricRef} coords={coords} />}
        </>
      )}
    </RadioProvider>
  );
}
