import "./WorkSpace.css";
import { useCollection } from "../../hooks/useCollection";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getDoc, doc, onSnapshot, collection, query, where } from "firebase/firestore";

import { db } from "../../firebase/config";
import Select from "react-select";
import MatchPoster from "./MatchPoster";
import background from "../../img/back.png";
import posterCoords from "./coordinates.json";
import StartingSquad from "./StartingSquad";
import GoalPoster from "./GoalPoster";
import { exportImg } from "./components/exportImg";
import useCreateYourTeamGoals from "./hooks2/useCreateYourTeamGoals";
import ReservePlayers from "./components/ReservePlayers";
import useReservePlayer from "./hooks2/useReservePlayer";
import useCreateOpponentGoals from "./hooks2/useCreateOpponentGoals";
import useTimeTable from "./hooks2/useTimeTable";
import TimeTable from "./TimeTable";
import TimeTableEdit from "./components/TimeTableEdit";
import ResultTable from "./ResultTable";
import ResultTableEdit from "./components/ResultTableEdit";
import useResults from "./hooks/useResults";
import useTeamOption from "./hooks/TimeTable/useTeamOption";
import { YourTeamNameAndLogo } from "./hooks2/useYourTeamLogo";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Canvas from "./Canvas";
import TrainingPlan from "./components/TrainingPlan";
import EditPanel from "./components2/EditPanel";

function WorkSpace() {
  const { poster } = useParams();
  const fabricRef = useRef();
  const { user } = useAuthContext();
  const { documents: Licenses } = useCollection("user", ["uid", "==", user.uid]);
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", user.uid]);
  
  const { documents: coordinates } = useCollection("coords", ["uid", "==", poster]);
  const { documents: MainCatalog } = useCollection("piecesOfPoster", ["uuid", "==", poster]);
  const { documents: yourCatalog } = useCollection("yourCatalog", ["uuid", "==", poster]);
  const navigate = useNavigate();
  const [coords, setCoords] = useState();
  useEffect(() => {
    posterCoords.map((postersCoords) => {
      if (postersCoords.id === poster) {
        setCoords(postersCoords);
      }
    });
  }, []);
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
  // const [yourTeamGoal, handleGoalChange, handleYourTeamMinuteChange, yourTeamGoalMinute] = useCreateYourTeamGoals(
  //   Array(9).fill()
  // );
  const [yourTeam, teamOption, getTeamOption, yourLogo, yourName] = YourTeamNameAndLogo(Logo);

  // const [opponentGoals, handleOpponentGoalChange, handleOpponentMinuteChange, opponentGoalMinute] =
  //   useCreateOpponentGoals(Array(9).fill());

  const [reserve, handleReserveChange] = useReservePlayer(Array(9).fill());
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
    handleSelectHostChange,
    manyLeaguesValues,
    setManyLeaguesValues,
    handleLeagueChange,
  } = useTimeTable();
  const { yourTeamResultsValue, opponentTeamResultsValue, handleOpponentTeamResultChange, handleYourTeamResultChange } =
    useResults(Array(6).fill());

  let options;

  if (Opponent) {
    options = Opponent.map((opponent) => ({
      value: opponent.img,
      label: opponent.firstName + " " + opponent.secondName,
    }));
  }
  const { concated, selectTeamValue, handleSelectTeamValue } = useTeamOption(Logo, Opponent);

  // const [playerOptions, setPlayerOption] = useState([]);
  // const [fullPlayers, setFullPlayers] = useState([]);
  // const [playerOptions2, setPlayerOption2] = useState([]);
  // const [specialPlayerOptions, setSpecialPlayerOption] = useState([]);
  // const [specialPlayerOptions2, setSpecialPlayerOption2] = useState([]);
  // const [reserveOptionsThree, setReserveOptionsThree] = useState([]);
  // const [reserveTwoOptions, setReserveTwoOptions] = useState([]);
  // const [reserveOptionsOne, setReserveOptionsOne] = useState([]);

  // let playerOption;
  // let playerOption2;
  // let reserveOptions;
  // let reserveOptions2;
  // let reserveOptions3;
  // useEffect(() => {
  //   if (Players) {
  //     playerOption = Players.map((player) => ({
  //       value: player.number + "." + player.secondName,
  //       label: player.number + " " + player.firstName + " " + player.secondName,
  //     }));
  //     playerOption.forEach((item, i) => {
  //       if (!Players[i].number) {
  //         item.value = item.value.replace(".", " ");
  //       }
  //     });
  //     setFullPlayers(playerOption);
  //     setPlayerOption(playerOption);
  //     setSpecialPlayerOption(playerOption);
  //     playerOption2 = Players.map((player) => ({
  //       value: player.number + "." + player.firstName + "." + player.secondName,
  //       label: player.number + " " + player.firstName + " " + player.secondName,
  //     }));
  //     setPlayerOption2(playerOption2);
  //     reserveOptions = Players.map((player) => ({
  //       value: player.secondName,
  //       label: player.number + " " + player.firstName + " " + player.secondName,
  //     }));
  //     reserveOptions2 = Players.map((player) => ({
  //       value: player.number + "." + player.firstName[0].toUpperCase() + "." + player.secondName,
  //       label: player.number + " " + player.firstName + " " + player.secondName,
  //     }));
  //     reserveOptions3 = Players.map((player) => ({
  //       value: player.number + "." + player.secondName,
  //       label: player.number + " " + player.firstName + " " + player.secondName,
  //     }));
  //     setReserveOptionsOne(reserveOptions);
  //     setReserveOptionsThree(reserveOptions3);

  //     setReserveTwoOptions(reserveOptions2);
  //   }
  // }, [Players]);
  // const [opponent, setOpponent] = useState();
  // const [opponentName, setOpponentName] = useState();
  const [posters, setPosters] = useState();

  const [themeOption, setThemeOption] = useState([]);
  const [selectThemes, setSelectThemes] = useState();
  const [selectPlayerTheme, setSelectPlayerThemes] = useState([]);
  // useEffect(() => {
  //   if (selectPlayerTheme) {
  //     setSelectPlayerThemes([...selectPlayerTheme].sort((a, b) => a.label.localeCompare(b.label)));
  //   }
  // }, [posters]);

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

  useEffect(() => {
    if (themeOption.length === 0 && selectPlayerTheme.length > 1) {
      setSelectThemes(selectPlayerTheme[0]);
    }
  }, [selectPlayerTheme]);

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
    } else {
      if (themeOption) {
        if (themeOption.length > 0) {
          fetch(`${themeOption[0].value}`)
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
      }
    }
  }, [selectThemes, themeOption]);

 

  // GOOOL

 
  

  const [radioChecked, setRadioChecked] = useState("radio1");



  const [initScale, setInitScale] = useState();
  const [scaleX, setScaleX] = useState();
  const [scaleY, setScaleY] = useState();
  useEffect(() => {
    if (dataURL) {
      const image = new Image();
      image.src = dataURL;
      image.onload = () => {
        if (image.width > 2000 || image.height > 2000) {
          setInitScale(0.5);
          setScaleX(150);
          setScaleY(100);
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
                  {fabricRef && dataURL && <Canvas
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
                    
                  />}
                
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
                  <button className="btn" onClick={() => navigate(`/posterCreator/${poster}`)}>
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
              {coords && coords.yourTeamLogoOne && coords.type === "yourLogo" && (
              <>
                {teamOption && teamOption.length > 1 && (
                  <>
                    <label>Twoje drużyny</label>
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

              {/* GOL zawodnika */}
              {/* {coords && coords.player && (
                <>
                  <label>Zawodnik</label>
                  <Select options={playerOptions} onChange={getYourPlayer} />
                </>
              )} */}

              <button
                className="btn primary-btn save"
                onClick={() => {
                  exportImg(Licenses, selectThemes, user, poster, coords.type);
                }}
              >
                Zapisz
              </button>
            </div>
            {Licenses && Licenses[0].license === "free-trial" && (
              <div className="license-place">
                <span className="license-content">Masz jeszcze {Licenses[0].numberOfFreeUse} darmowych użyć</span>
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
