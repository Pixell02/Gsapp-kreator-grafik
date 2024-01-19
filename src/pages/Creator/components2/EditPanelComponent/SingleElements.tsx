import translation from "../../locales/translate.json";
import AdditionalImageLayer from "./SingleElements/AdditionalImageLayer.jsx";
import AdditionalText from "./SingleElements/AdditionalText.jsx";
import Images from "./SingleElements/Images.jsx";
import OpponentSelect from "./SingleElements/OpponentSelect.tsx";
import PlacePreset from "./SingleElements/PlacePreset.tsx";
import Player from "./SingleElements/Player.jsx";
import PlayersGoals from "./SingleElements/PlayersGoals.tsx";
import Radio from "./SingleElements/Radio.jsx";
import Result from "./SingleElements/Result.tsx";
import StartingSquad from "./SingleElements/StartingSquad.jsx";
import TeamOption from "./SingleElements/TeamOption.tsx";
import TextBoxInput from "./SingleElements/TextBoxInput.jsx";
import TextInput from "./SingleElements/TextInput.tsx";
import ThemeOption from "./SingleElements/ThemeOption.tsx";
import { useLanguageContext } from "../../../../context/LanguageContext.tsx";
import { useThemeContext } from "../../context/ThemeContext.tsx";
import { DocumentData } from "firebase/firestore";
import { textCoordsProps } from "./SingleElements/hooks/useTextLayer.tsx";
import { props } from "../../../../types/translationTypes.tsx";
type Modal = {
  id: number | null;
  open: boolean;
};
type componentProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
  setIsModalOpen: (value: Modal) => void;
  setSelectedPoster: (value: DocumentData | null) => void;
};

type translateProps = {
  typePlace: props;
};

const SingleElements = ({ coords, fabricRef, setIsModalOpen, setSelectedPoster }: componentProps) => {
  const { language } = useLanguageContext();
  const translate: translateProps = translation;
  const playersArray = Array.isArray(coords.player) ? coords.player : [coords.player];
  const { themeColor } = useThemeContext();
  const playersImageArray = Array.isArray(coords.playerImage) ? coords.playerImage : [coords.playerImage];
  const largerArray = playersArray?.length > playersImageArray?.length ? playersArray : playersImageArray;

  return (
    <div className="mt-3">
      {fabricRef?.current && <AdditionalImageLayer fabricRef={fabricRef} />}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <Radio />
      )}
      {themeColor && <ThemeOption setSelectedPoster={setSelectedPoster} />}
      {coords.additionalText && <AdditionalText fabricRef={fabricRef} coords={coords} />}
      {(coords.yourTeamLogo || coords.yourTeamFirstName || coords.yourTeamSecondName || coords.yourTeamName) && (
        <TeamOption fabricRef={fabricRef} coords={coords} />
      )}
      {coords.typePlace && (
        <PlacePreset fabricRef={fabricRef} coords={coords.typePlace} name={translate.typePlace[language]} />
      )}
      {(coords.opponentImage || coords.opponentFirstName || coords.opponentSecondName || coords.opponentName) && (
        <OpponentSelect fabricRef={fabricRef} coords={coords} />
      )}
      {coords.yourTeamResult && <Result fabricRef={fabricRef} coords={coords} />}
      {fabricRef?.current && (
        <>
          {coords.Images?.Image?.map((image: DocumentData) => (
            <Images fabricRef={fabricRef} filters={coords?.Images?.filters} coords={image} />
          ))}
          {!coords.Images?.Image &&
            coords.Images?.map((image: DocumentData) => (
              <Images fabricRef={fabricRef} filters={image.filters} coords={image} />
            ))}
        </>
      )}
      {(coords.player || coords.playerImage) &&
        largerArray[0] !== null &&
        largerArray.map((_, i) => (
          <Player
            key={i}
            fabricRef={fabricRef}
            i={i}
            playersName={playersArray[i]}
            playersImage={playersImageArray[i]}
          />
        ))}
      {coords.Text?.length > 0 &&
        coords.Text?.map((coords: textCoordsProps, i: number) => (
          <TextInput key={i} fabricRef={fabricRef} i={i} coords={coords} />
        ))}
      {coords.TextBox?.length > 0 &&
        coords.TextBox?.map((coords: textCoordsProps, i: number) => (
          <TextBoxInput i={i} fabricRef={fabricRef} coords={coords} />
        ))}

      {coords.yourPlayerOneGoal && fabricRef?.current && <PlayersGoals fabricRef={fabricRef} coords={coords} />}
      <StartingSquad setIsModalOpen={setIsModalOpen} coords={coords} />
    </div>
  );
};

export default SingleElements;
