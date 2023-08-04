import "./WorkSpace.css";
import { useCollection } from "../../hooks/useCollection";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Select from "react-select";
import background from "../../img/back.png";
import { exportImg } from "./components/exportImg";
import useTimeTable from "./hooks2/useTimeTable";
import TimeTableEdit from "./components/TimeTableEdit";
import ResultTableEdit from "./components/ResultTableEdit";
import useResults from "./hooks/useResults";
import useTeamOption from "./hooks/TimeTable/useTeamOption";
import { YourTeamNameAndLogo } from "./hooks2/useYourTeamLogo";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Canvas from "./Canvas";
import EditPanel from "./components2/EditPanel";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translate from "./locales/translate.json";
function WorkSpace() {
  const { poster } = useParams();
  const fabricRef = useRef();
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const { documents: Licenses } = useCollection("user", ["uid", "==", user.uid]);
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: coordinates } = useCollection("coords", ["uid", "==", poster]);
  const { documents: MainCatalog } = useCollection("piecesOfPoster", ["uuid", "==", poster]);
  const { documents: yourCatalog } = useCollection("yourCatalog", ["uuid", "==", poster]);
  const navigate = useNavigate();
  const [coords, setCoords] = useState();
  useEffect(() => {
    if (coordinates)
      if (coordinates.length > 0) {
        setCoords(coordinates[0]);
      }
  }, [coordinates]);
  const [numberOfMatch, setNumberOfMatch] = useState();
  useEffect(() => {
    if (coords) {
      setNumberOfMatch(coords.numberOfMatches);
    }
  }, [coords]);

  const [yourTeam, teamOption, getTeamOption, yourLogo, yourName] = YourTeamNameAndLogo(Logo);

  const {
    loops,
    handleRadioChange,
    handleTextChange,
    handleSelectChange,
    radioValues,
    textInputValues,
    selectValues,
    selectNamesValues,
    selectLogoValues,
    selectHostLogoValues,
    selectHostNamesValues,
    setSelectHostNamesValues,
    handleSelectHostChange,
    manyLeaguesValues,
    setManyLeaguesValues,
    handleLeagueChange,
  } = useTimeTable();
  const { yourTeamResultsValue, opponentTeamResultsValue, handleOpponentTeamResultChange, handleYourTeamResultChange } =
    useResults(Array(6).fill());

  useEffect(() => {
    if (yourName) {
      setSelectHostNamesValues(Array(numberOfMatch).fill(yourName.split(".")[0] + " " + yourName.split(".")[1]));
    }
  }, [yourName, coords]);

  let options;

  if (Opponent) {
    options = Opponent.map((opponent) => ({
      value: opponent.img,
      label: opponent.firstName + " " + opponent.secondName,
    }));
  }
  const { concated, selectTeamValue, handleSelectTeamValue } = useTeamOption(Logo, Opponent);

  const [themeOption, setThemeOption] = useState([]);
  const [selectThemes, setSelectThemes] = useState();

  useEffect(() => {
    if (MainCatalog) {
      if (MainCatalog.length > 0) {
        setThemeOption(MainCatalog.map((item) => ({ value: item.src, label: item.color })));
      }
    }
    if (yourCatalog) {
      if (yourCatalog.length > 0) {
        setThemeOption(yourCatalog.map((item) => ({ value: item.src, label: item.color })));
      }
    }
  }, [MainCatalog, yourCatalog]);

  useEffect(() => {
    setSelectThemes(themeOption[0]);
  }, [themeOption]);

  const [dataURL, setDataURL] = useState();

  useEffect(() => {
    if (selectThemes) {
      fetch(`${selectThemes.value}`)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setDataURL(reader.result);
          };
        })
        .catch((error) => {
          console.error(error);
          setDataURL(null);
        });
    }
  }, [selectThemes]);

  const location = useLocation();
  const [hasTheme, setHasTheme] = useState(false);
  useEffect(() => {
    const theme = extractThemeFromURL(location.pathname);
    setHasTheme(theme !== null);
  }, [location]);

  const extractThemeFromURL = (pathname) => {
    const parts = pathname.split("/");
    const themeIndex = parts.indexOf("theme");
    if (themeIndex !== -1 && themeIndex < parts.length - 1) {
      return parts[themeIndex + 1];
    }
    return null; // Jeśli nie znaleziono wartości theme w adresie URL
  };

  // GOOOL

  const [radioChecked, setRadioChecked] = useState("radio1");

  const [initScale, setInitScale] = useState();
  useEffect(() => {
    if (dataURL) {
      const image = new Image();
      image.src = dataURL;
      image.onload = () => {
        if (image.width > 2000 || image.height > 2000) {
          setInitScale(0.5);
        } else if (image.width > 1000 || image.height > 1000) {
          setInitScale(0.75);
        } else if (image.width < 1000 || image.height < 1000) {
          setInitScale(1);
        }
      };
    }
  }, [dataURL]);

  return (
    <>
      {Licenses && Licenses[0].license === "no-license" && (
        <div className="license-content">
          <p>
            Brak licencji <Link to="/offer">Kup dostęp</Link>
          </p>
        </div>
      )}
      {Licenses && Licenses[0].license !== "no-license" && (
        <div className="workspace-container">
          <div className="preview-container">
            <TransformWrapper minScale={0.1} initialScale={initScale} centerOnInit>
              <TransformComponent>
                <div className="d-flex w-100 h-100">
                  {fabricRef && (selectHostNamesValues ? selectHostNamesValues : null) && dataURL && (
                    <Canvas
                      posterBackGround={dataURL}
                      coords={coords}
                      yourLogo={Logo}
                      yourTeamImage={yourLogo}
                      fabricRef={fabricRef}
                      radioValues={radioValues}
                      textInputValues={textInputValues}
                      selectValues={selectValues}
                      selectTeamValue={selectTeamValue}
                      selectNamesValues={selectNamesValues}
                      selectLogoValues={selectLogoValues}
                      selectHostLogoValues={selectHostLogoValues}
                      selectHostNamesValues={selectHostNamesValues}
                      manyLeaguesValues={manyLeaguesValues}
                      setManyLeaguesValues={setManyLeaguesValues}
                      handleLeagueChange={handleLeagueChange}
                      yourTeamResultsValue={yourTeamResultsValue}
                      opponentTeamResultsValue={opponentTeamResultsValue}
                    />
                  )}
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>

          <div className="tools-container">
            <div className="workspace-title">
              <div className="d-flex flex-column mt-4">
                {(user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" ||
                  user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" ||
                  user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2") && (
                  <button
                    className="btn"
                    onClick={() =>
                      navigate(
                        hasTheme ? `/${language}/posterCreator/theme/${poster}` : `/${language}/posterCreator/${poster}`
                      )
                    }
                  >
                    Edytuj
                  </button>
                )}

                <span className="workspace-title-container">Kreator</span>
              </div>
            </div>
            <div className="ms-5 me-5 mt-3">
              {/* Właściwy workspace */}
              {coords && fabricRef && themeOption && selectThemes && (
                <EditPanel
                  coords={coords}
                  fabricRef={fabricRef}
                  themeOption={selectThemes}
                  setSelectThemes={setSelectThemes}
                  themeOptions={themeOption}
                  posterBackground={dataURL}
                />
              )}
              {coords && coords.type === "yourLogo" && (
                <>
                  {teamOption && teamOption.length > 1 && (
                    <>
                      <label>{translate.yourTeam[language]}</label>
                      <Select options={teamOption} onChange={getTeamOption} />
                    </>
                  )}
                </>
              )}
              {/* Terminarz */}
              {coords && coords.typeDataOne && (
                <TimeTableEdit
                  opponent={concated}
                  opponents={options}
                  handleRadioChange={handleRadioChange}
                  radioValues={radioValues}
                  handleTextChange={handleTextChange}
                  handleSelectChange={handleSelectChange}
                  textInputValues={textInputValues}
                  selectValues={selectValues}
                  handleSelectTeamValue={handleSelectTeamValue}
                  coords={coords}
                  concated={concated}
                  radioChecked={radioChecked}
                  setRadioChecked={setRadioChecked}
                  selectNamesValues={selectNamesValues}
                  selectLogoValues={selectLogoValues}
                  selectHostLogoValues={selectHostLogoValues}
                  selectHostNamesValues={selectHostNamesValues}
                  handleSelectHostChange={handleSelectHostChange}
                  numberOfMatches={numberOfMatch}
                  manyLeaguesValues={manyLeaguesValues}
                  setManyLeaguesValues={setManyLeaguesValues}
                  handleLeagueChange={handleLeagueChange}
                />
              )}

              {coords && coords.yourTeamResultsOne && (
                <ResultTableEdit
                  opponent={options}
                  concated={concated}
                  handleRadioChange={handleRadioChange}
                  radioValues={radioValues}
                  yourTeamResultsValue={yourTeamResultsValue}
                  handleYourTeamResultChange={handleYourTeamResultChange}
                  opponentTeamResultsValue={opponentTeamResultsValue}
                  handleOpponentTeamResultChange={handleOpponentTeamResultChange}
                  handleSelectChange={handleSelectChange}
                  manyLeaguesValues={manyLeaguesValues}
                  setManyLeaguesValues={setManyLeaguesValues}
                  handleLeagueChange={handleLeagueChange}
                  selectValues={selectValues}
                  selectNamesValues={selectNamesValues}
                  selectLogoValues={selectLogoValues}
                  coords={coords}
                  opponents={options}
                  selectHostLogoValues={selectHostLogoValues}
                  selectHostNamesValues={selectHostNamesValues}
                  handleSelectHostChange={handleSelectHostChange}
                  numberOfMatches={numberOfMatch}
                />
              )}

              <button
                className="btn primary-btn save"
                onClick={() => exportImg(Licenses, selectThemes, user, poster, coords.type)}
              >
                {translate.save[language]}
              </button>
            </div>
            {Licenses && Licenses[0].license === "free-trial" && (
              <div className="license-place">
                <span className="license-content">
                  {translate.freeUsesFirstPart[language]} {Licenses[0].numberOfFreeUse}{" "}
                  {translate.freeUsesLastPart[language]}
                </span>
              </div>
            )}

            <div className="empty-field"></div>
            <div className="background-image">
              <img src={background} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkSpace;
