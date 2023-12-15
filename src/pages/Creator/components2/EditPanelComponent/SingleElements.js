import translate from '../../locales/translate.json';
import AdditionalImageLayer from './SingleElements/AdditionalImageLayer';
import AdditionalText from './SingleElements/AdditionalText';
import Images from './SingleElements/Images';
import OpponentSelect from './SingleElements/OpponentSelect';
import PlacePreset from './SingleElements/PlacePreset';
import Player from './SingleElements/Player';
import PlayersGoals from './SingleElements/PlayersGoals';
import Radio from './SingleElements/Radio';
import Result from './SingleElements/Result';
import StartingSquad from './SingleElements/StartingSquad';
import TeamOption from './SingleElements/TeamOption';
import TextBoxInput from './SingleElements/TextBoxInput';
import TextInput from './SingleElements/TextInput';
import TextLineInput from './SingleElements/TextLineInput';
import ThemeOption from './SingleElements/ThemeOption';
import useThemeContext from '../../hooks/useThemeContext';
import { useLanguageContext } from '../../../../context/LanguageContext';
import { useCalendarCoords } from '../../context/CalendarContext';

const SingleElements = ({ coords, fabricRef, themeOptions, Opponents, Players, setIsModalOpen, additionalLayer }) => {
  const { language } = useLanguageContext();
  const playersArray = Array.isArray(coords.player) ? coords.player : [coords.player];
  const { themeColor } = useThemeContext();
  const playersImageArray = Array.isArray(coords.playerImage) ? coords.playerImage : [coords.playerImage];
  const largerArray = playersArray?.length > playersImageArray?.length ? playersArray : playersImageArray;
  const { graphicProperties } = useCalendarCoords();

  return (
    <div>
      {additionalLayer && (
        <AdditionalImageLayer
          fabricRef={fabricRef}
          additionalLayer={additionalLayer}
        />
      )}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <Radio />
      )}
      {themeColor && <ThemeOption themeOptions={themeOptions} />}
      {coords.additionalText && (
        <AdditionalText
          fabricRef={fabricRef}
          coords={coords}
        />
      )}
      {(coords.yourTeamLogo || coords.yourTeamFirstName || coords.yourTeamSecondName || coords.yourTeamName) && (
        <TeamOption
          fabricRef={fabricRef}
          coords={coords}
        />
      )}
      {coords.typeMonth && (
        <TextLineInput
          fabricRef={fabricRef}
          coords={coords.typeMonth}
          name={translate.typeMonth[language]}
        />
      )}
      {coords.typePlace && (
        <>
          <PlacePreset
            fabricRef={fabricRef}
            coords={coords.typePlace}
            name={translate.typePlace[language]}
          />
          <TextLineInput
            fabricRef={fabricRef}
            coords={coords.typePlace}
            name={translate.typePlace[language]}
            defaultValue={graphicProperties.selectedPlacePreset}
          />
        </>
      )}
      {coords.typeData && (
        <TextLineInput
          fabricRef={fabricRef}
          coords={coords.typeData}
          name={translate.typeDate[language]}
          defaultValue={graphicProperties.date}
        />
      )}
      {coords.yourKolejka && (
        <TextLineInput
          fabricRef={fabricRef}
          coords={coords.yourKolejka}
          name={translate.typeRound[language]}
        />
      )}
      {coords.yourLeague && (
        <TextLineInput
          fabricRef={fabricRef}
          coords={coords.yourLeague}
          name={translate.typeLeague[language]}
        />
      )}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <OpponentSelect
          fabricRef={fabricRef}
          coords={coords}
          Opponents={Opponents}
        />
      )}
      {coords.yourTeamResult && (
        <Result
          fabricRef={fabricRef}
          coords={coords}
        />
      )}
      {coords.Images?.Image?.map((image) => (
        <Images
          fabricRef={fabricRef}
          filters={coords?.Images?.filters}
          coords={image}
        />
      ))}
      {!coords.Images?.Image &&
        coords.Images?.map((image) => (
          <Images
            fabricRef={fabricRef}
            filters={image.filters}
            coords={image}
          />
        ))}
      {(coords.player || coords.playerImage) &&
        largerArray[0] !== null &&
        largerArray.map((item, i) => (
          <Player
            key={i}
            i={i}
            fabricRef={fabricRef}
            playersArray={playersArray}
            playersImageArray={playersImageArray}
            Players={Players}
            additionalLayer={additionalLayer}
          />
        ))}
      {coords.Text?.length > 0 &&
        coords.Text?.map((coords) => (
          <TextInput
            fabricRef={fabricRef}
            coords={coords}
          />
        ))}
      {coords.TextBox?.length > 0 &&
        coords.TextBox?.map((coords) => (
          <TextBoxInput
            fabricRef={fabricRef}
            coords={coords}
          />
        ))}

      {coords.yourPlayerOneGoal && (
        <PlayersGoals
          fabricRef={fabricRef}
          coords={coords}
          Players={Players}
        />
      )}
      <StartingSquad
        setIsModalOpen={setIsModalOpen}
        fabricRef={fabricRef}
        coords={coords}
      />
    </div>
  );
};

export default SingleElements;
