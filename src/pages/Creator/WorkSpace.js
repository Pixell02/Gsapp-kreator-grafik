import "./WorkSpace.css";
import { useCollection } from "../../hooks/useCollection";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getDoc, doc, onSnapshot, collection, query, where } from "firebase/firestore";

import { db } from "../../firebase/config";
import Select from "react-select";
import MatchPoster from "./Canvas";
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
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

function WorkSpace() {
  const { poster } = useParams();
 
  const { user } = useAuthContext();
  const { documents: Licenses } = useCollection("user", ["uid", "==", user.uid]);
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: coordinates } = useCollection("coords", ["uid", "==", poster]);
  ;
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
  const [yourTeamGoal, handleGoalChange, handleYourTeamMinuteChange, yourTeamGoalMinute] = useCreateYourTeamGoals(
    Array(9).fill()
  );
  const [yourTeam, teamOption, getTeamOption, yourLogo, yourName] = YourTeamNameAndLogo(Logo);

  const [opponentGoals, handleOpponentGoalChange, handleOpponentMinuteChange, opponentGoalMinute] =
    useCreateOpponentGoals(Array(9).fill());

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
    handleLeagueChange
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

  

  const [playerOptions, setPlayerOption] = useState([]);
  const [fullPlayers, setFullPlayers] = useState([]);
  const [playerOptions2, setPlayerOption2] = useState([]);
  const [specialPlayerOptions, setSpecialPlayerOption] = useState([]);
  const [specialPlayerOptions2, setSpecialPlayerOption2] = useState([]);
  const [reserveOptionsThree, setReserveOptionsThree] = useState([]);
  const [reserveTwoOptions, setReserveTwoOptions] = useState([]);
  const [reserveOptionsOne, setReserveOptionsOne] = useState([]);

  let playerOption;
  let playerOption2;
  let reserveOptions;
  let reserveOptions2;
  let reserveOptions3;
  useEffect(() => {
    if (Players) {
      playerOption = Players.map((player) => ({
        value: player.number + "." + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      playerOption.forEach((item, i) => {
        if (!Players[i].number) {
          item.value = item.value.replace(".", " ");
        }
      });
      setFullPlayers(playerOption);
      setPlayerOption(playerOption);
      setSpecialPlayerOption(playerOption);
      playerOption2 = Players.map((player) => ({
        value: player.number + "." + player.firstName + "." + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      setPlayerOption2(playerOption2);
      reserveOptions = Players.map((player) => ({
        value: player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      reserveOptions2 = Players.map((player) => ({
        value: player.number + "." + player.firstName[0].toUpperCase() + "." + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      reserveOptions3 = Players.map((player) => ({
        value: player.number + "." + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      setReserveOptionsOne(reserveOptions);
      setReserveOptionsThree(reserveOptions3);

      setReserveTwoOptions(reserveOptions2);
    }
  }, [Players]);
  const [opponent, setOpponent] = useState();
  const [opponentName, setOpponentName] = useState();
  const [posters, setPosters] = useState();

  const [themeOption, setThemeOption] = useState([]);
  const [selectThemes, setSelectThemes] = useState();
  const [selectPlayerTheme, setSelectPlayerThemes] = useState([]);
  // useEffect(() => {
  //   if (selectPlayerTheme) {
  //     setSelectPlayerThemes([...selectPlayerTheme].sort((a, b) => a.label.localeCompare(b.label)));
  //   }
  // }, [posters]);

  const [isPOP, setIsPOP] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "piecesOfPoster");
    const q = query(colRef, where("uuid", "==", poster));
    let postersarray = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        postersarray.push({ ...doc.data(), id: doc.id });
      });
      setThemeOption(postersarray.map((item) => ({ value: item.src, label: item.color })));
    });
    setIsPOP(true);
  }, []);
  useEffect(() => {
    let postersarray = [];
    const docRef = collection(db, "yourCatalog");
    const q2 = query(docRef, where("uuid", "==", poster));

    onSnapshot(q2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        postersarray.push({ ...doc.data(), id: doc.id });
      });
      if (postersarray.length > 1) {
        setSelectPlayerThemes(
          postersarray.map((item, i) => ({
            value: item.src,
            label: item.color,
          }))
        );
      }
    });
  }, [isPOP]);
  
  useEffect(() => {
    setSelectThemes(themeOption[0]);
  }, [themeOption]);

  useEffect(() => {
    if (themeOption.length === 0 && selectPlayerTheme.length > 1) {
      setSelectThemes(selectPlayerTheme[0]);
    }
  }, [selectPlayerTheme]);

  // Getting background
  useEffect(() => {
    const addBackground = () => {
      const docRef = doc(db, "piecesOfPoster", poster);
      getDoc(docRef).then((doc) => {
        setPosters(doc.data());
      });
    };

    const addYourBackground = () => {
      const docRef = doc(db, "yourCatalog", poster);
      getDoc(docRef).then((doc) => {
        setPosters(doc.data());
      });
    };

    if (!posters && themeOption.length === 0) {
      addYourBackground();
    } else if (!posters && themeOption.length > 0) {
      addBackground();
    }
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
    } else {
      if (posters) {
        fetch(`${posters.src}`)
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
  }, [selectThemes, posters]);

  const [selectedOption, setSelectedOption] = useState(null);

  const playerSelectTheme = (option) => {
    setSelectThemes(option);
  };

  const setOpponentLogo = (option) => {
    fetch(`${option.value}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setOpponent(reader.result);
        };
      });

    setOpponentName(option.label);
  };

  const setThemeBackground = (option) => {
    setSelectThemes(option);
  };

  const [typeDate, setTypeDate] = useState("");

  const date = (e) => {
    setTypeDate(e.target.value);
  };
  const [typePlace, setTypePlace] = useState("");
  const place = (e) => {
    setTypePlace(e.target.value);
  };

  const [typeKolejka, setTypeKolejka] = useState("");

  const kolejka = (e) => {
    setTypeKolejka(e.target.value);
  };

  // GOOOL

  const [yourPlayer, setYourPlayer] = useState();
  const [yourPlayerImg, setYourPlayerImg] = useState();

  const getYourPlayer = (option) => {
    let splitName = option.label.split(" ");
    let fullName = splitName[1] + " " + splitName[2];
    setYourPlayer(fullName);
    setYourPlayerImg(option.value);
  };
  // Result

  const [yourTeamResult, setYourTeamResult] = useState();

  const yourResult = (e) => {
    setYourTeamResult(e.target.value);
  };

  const [yourOpponentResult, setYourOpponentResult] = useState();

  const opponentResult = (e) => {
    setYourOpponentResult(e.target.value);
  };

  const [goalKeeper, setGoalKeeper] = useState();
  const [capitan, setCapitan] = useState();

  const getGoalKeeper = (options) => {
    setGoalKeeper(options.value);
    // let filtered = specialPlayerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setSpecialPlayerOption(filtered);
  };
  const getCapitan = (options) => {
    setCapitan(options.value);
    // let filtered = specialPlayerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setSpecialPlayerOption(filtered);
  };

  // Monthly

  const [league, setLeague] = useState();

  const getLeague = (e) => {
    setLeague(e.target.value);
  };
  const [month, setMonth] = useState();

  const getMonth = (e) => {
    setMonth(e.target.value);
  };

  const [radioChecked, setRadioChecked] = useState("radio1");

  const [squadPlayers, setSquadPlayers] = useState(Array(11).fill());
  const handlePlayerChange = (option, i) => {
    const newPlayerValue = [...squadPlayers];
    newPlayerValue[i] = option.value;
    setSquadPlayers(newPlayerValue);
  };

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
                    {coords && posters && posters.type === "GOOOOL" && (
                      <GoalPoster
                        posterBackGround={dataURL}
                        coords={coords}
                        yourPlayer={yourPlayer}
                        yourTeamImage={yourLogo}
                        yourLogo={yourName}
                        themeOption={selectThemes}
                        yourTeamResult={yourTeamResult}
                        yourOpponentResult={yourOpponentResult}
                        opponent={opponent}
                        radioChecked={radioChecked}
                        id={posters}
                      />
                    )}

                    {coords && posters && posters.type === "MATCH-POSTER" && (
                      <MatchPoster
                        id={posters}
                        posterBackGround={dataURL}
                        opponent={opponent}
                        yourTeamImage={yourLogo}
                        yourLogo={yourName}
                        coords={coords}
                        date={typeDate}
                        place={typePlace}
                        opponentName={opponentName}
                        radioChecked={radioChecked}
                        themeOption={selectThemes}
                        league={league}
                        kolejka={typeKolejka}
                        yourTeamResult={yourTeamResult}
                        yourOpponentResult={yourOpponentResult}
                      />
                    )}

                    {coords && posters && posters.type === "STARTING-SQUAD" && (
                      <StartingSquad
                        poster={poster}
                        posterBackGround={dataURL}
                        opponent={opponent}
                        yourLogo={yourName}
                        yourTeamImage={yourLogo}
                        coords={coords}
                        date={typeDate}
                        place={typePlace}
                        kolejka={typeKolejka}
                        players={squadPlayers}
                        opponentName={opponentName}
                        reserve={reserve}
                        radioChecked={radioChecked}
                        themeOption={selectThemes}
                        goalKeeper={goalKeeper}
                        capitan={capitan}
                        league={league}
                        id={posters}
                      />
                    )}
                    {coords && posters && posters.type === "RESULT" && (
                      <MatchPoster
                        posterBackGround={dataURL}
                        opponent={opponent}
                        yourLogo={yourName}
                        yourTeamImage={yourLogo}
                        id={posters}
                        coords={coords}
                        date={typeDate}
                        place={typePlace}
                        opponentName={opponentName}
                        radioChecked={radioChecked}
                        themeOption={selectThemes}
                        league={league}
                        opponentGoalMinute={opponentGoalMinute}
                        opponentGoal={opponentGoals}
                        yourTeamGoalMinute={yourTeamGoalMinute}
                        yourTeamGoal={yourTeamGoal}
                        yourTeamResult={yourTeamResult}
                        yourOpponentResult={yourOpponentResult}
                      />
                    )}
                    {coords && posters && posters.type === "TIMETABLE" && (
                      <TimeTable
                        posterBackGround={dataURL}
                        opponent={opponent}
                        yourLogo={Logo}
                        yourTeamImage={yourLogo}
                        id={posters}
                        coords={coords}
                        date={typeDate}
                        place={typePlace}
                        opponentName={opponentName}
                        league={league}
                        radioValues={radioValues}
                        textInputValues={textInputValues}
                        selectValues={selectValues}
                        month={month}
                        selectTeamValue={selectTeamValue}
                        selectNamesValues={selectNamesValues}
                        selectLogoValues={selectLogoValues}
                        selectHostLogoValues={selectHostLogoValues}
                      selectHostNamesValues={selectHostNamesValues}
                      manyLeaguesValues={manyLeaguesValues}
                      setManyLeaguesValues={setManyLeaguesValues}
                      handleLeagueChange={handleLeagueChange} 
                      />
                    )}

                    {posters && posters.type === "RESULT-TABLE" && (
                      <ResultTable
                        posterBackGround={dataURL}
                        opponent={opponent}
                        yourLogo={Logo}
                        yourTeamImage={yourLogo}
                        id={posters}
                        coords={coords}
                        radioValues={radioValues}
                        yourTeamResultsValue={yourTeamResultsValue}
                        opponentTeamResultsValue={opponentTeamResultsValue}
                        selectValues={selectValues}
                        selectNamesValues={selectNamesValues}
                        selectLogoValues={selectLogoValues}
                        selectHostLogoValues={selectHostLogoValues}
                        selectHostNamesValues={selectHostNamesValues}
                        kolejka={typeKolejka}
                      />
                    )}
                  </div>
                </TransformComponent>
          
              </TransformWrapper>
            
          </div>

          <div className="tools-container">
            <div className="workspace-title">
              <div className="d-flex flex-column mt-4">
                {(user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" || user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" || user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2") && (
                  <button className="btn" onClick={() => navigate(`/posterCreator/${poster}`)}>Edytuj</button>
              )}
              
              
              <span className="workspace-title-container">Kreator</span>
              </div>
            </div>
            <div className="ms-5 me-5 mt-3">
              {/* Właściwy workspace */}

              {/* gospodarz / przeciwnik */}

              {coords && coords.opponentImage && (
                <>
                  <div className="option-container">
                    <div className="input-container">
                      <label className="label-container">
                        <input
                          type="radio"
                          value="radio1"
                          onChange={(e) => setRadioChecked(e.target.value)}
                          checked={radioChecked === "radio1"}
                        />
                        <span>Gospodarz</span>
                      </label>
                    </div>
                    <div className="input-container">
                      <label>
                        <input
                          type="radio"
                          value="radio2"
                          onChange={(e) => setRadioChecked(e.target.value)}
                          checked={radioChecked === "radio2"}
                        />
                        <span className="guest">Gość</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Motyw z zawodnikami */}

              {selectPlayerTheme && selectPlayerTheme.length > 1 && (
                <>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    Motywy
                  </label>

                  <Select
                    value={selectThemes}
                    options={selectPlayerTheme}
                    onChange={setThemeBackground}
                    className="select-option"
                  />
                </>
              )}

              {/* Motywy kolorystczne */}

              {themeOption && themeOption.length > 0 && (
                <>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    Motywy
                  </label>

                  <Select
                    value={selectThemes}
                    options={themeOption}
                    onChange={setThemeBackground}
                    className="select-option"
                  />
                </>
              )}
              {/* Twoje drużyny */}
              {teamOption && teamOption.length > 1 && (
                <>
                  <label>Twoje drużyny</label>
                  <Select options={teamOption} onChange={getTeamOption} />
                </>
              )}
              {/* Miesiąc */}
              {coords && coords.typeMonth && (
                <>
                  <label>Miesiąc</label>
                  <input type="text" value={month} onChange={getMonth} />
                </>
              )}

              {/* Kolejka */}

              {coords && coords.yourKolejka && (
                <>
                  <label>Kolejka</label>
                  <input type="text" value={typeKolejka} onChange={kolejka} />
                </>
              )}

              {/* Klasa / Liga */}
              {coords && coords.yourLeague && (
                <>
                  <label>Klasa / Liga</label>
                  <input type="text" value={league} onChange={getLeague} />
                </>
              )}
              {/* Miejsce */}
              {coords && coords.typePlace && (
                <>
                  <label>Miejsce</label>
                  <input type="text" value={typePlace} onChange={place} />
                </>
              )}
              {/* Data */}
              {coords && coords.typeData && (
                <>
                  <label>Data i godzina</label>
                  <input type="text" onChange={date} value={typeDate} className="date-type" />
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
              {/* Przeciwnicy */}
              {coords && coords.opponentImage && (
                <>
                  <label>Przeciwnicy</label>
                  {Opponent && <Select options={options} onChange={setOpponentLogo} />}
                </>
              )}
              {/* Wynik*/}
              {coords && coords.yourTeamResult && (
                <>
                  <input
                    type="number"
                    onChange={yourResult}
                    value={yourTeamResult}
                    style={{ width: "50px", textAlign: "center" }}
                    min="0"
                    max="99"
                  />
                  -
                  <input
                    type="number"
                    onChange={opponentResult}
                    value={yourOpponentResult}
                    style={{ width: "50px", textAlign: "center" }}
                    min="0"
                    max="99"
                  />
                  <br />
                </>
              )}

              {/* GOL zawodnika */}
              {coords && coords.player && (
                <>
                  <label>Zawodnik</label>
                  <Select options={playerOptions} onChange={getYourPlayer} />
                </>
              )}

              {/* GOLE zawodników */}

              {coords && coords.yourPlayerOneGoal && (
                <>
                  {yourTeamGoal &&
                    yourTeamGoal.map((goal, i) => (
                      <div key={i} className="goal-container">
                        <div className="minute-container">
                          <label htmlFor={`input${i+1}`}>Minuta</label>
                          <input
                            id={`input${i+1}`}
                            type="number"
                            min="0"
                            onChange={(e) => handleYourTeamMinuteChange(e, i)}
                          />
                        </div>
                        <div className="goals-container">
                          <label htmlFor={`select${i}`}>{`Twój GOL ${i + 1}`}</label>
                          <Select
                            className="player-select"
                            id={`select${i + 1}`}
                            options={playerOptions}
                            onChange={(e) => handleGoalChange(e, i)}
                          />
                        </div>
                      </div>
                    ))}
                </>
              )}

              {/* Gole przeciwników */}

              {coords &&
                coords.opponentPlayerOneGoal &&
                opponentGoals.map((goal, i) => (
                  <div key={i} className="goal-container">
                    <div className="minute-container">
                      <label htmlFor={`input${i}`}>Minuta</label>
                      <input
                        id={`imput${i}`}
                        type="number"
                        min="0"
                        onChange={(e) => handleOpponentMinuteChange(e, i)}
                      />
                    </div>
                    <div className="goals-container">
                      <label htmlFor={`text${i}`}>GOL przeciwnika</label>
                      <input id={`text${i}`} type="text" onChange={(e) => handleOpponentGoalChange(e, i)} />
                    </div>
                  </div>
                ))}

              {/*  */}
              {coords && coords.playerOne && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                <>
                  <p style={{ margin: "20px" }}>Zawodnicy</p>

                  {squadPlayers &&
                    squadPlayers.map((player, i) => (
                      <>
                        <div key={i}>
                          <label htmlFor={`select${i}`}>Zawodnik {i + 1}</label>

                          <Select
                            id={`select${i}`}
                            options={playerOptions2}
                            onChange={(option) => handlePlayerChange(option, i)}
                          />
                        </div>
                      </>
                    ))}
                </>
              )}
              {coords && coords.playerOne && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                <>
                  {squadPlayers &&
                    squadPlayers.map((player, i) => (
                      <>
                        <div key={i}>
                          <label htmlFor={`select${i}`}>Zawodnik {i + 1}</label>

                          <Select
                            id={`select${i}`}
                            options={playerOptions2}
                            onChange={(option) => handlePlayerChange(option, i)}
                          />
                        </div>
                      </>
                    ))}
                </>
              )}

              {posters && posters.type === "STARTING-SQUAD" && (
                <>
                  {Players && (
                    <>
                      <p style={{ marginTop: "20px" }}>Rezerwowi</p>

                      {coords && coords.reserveOne && (
                        <>
                          <ReservePlayers
                            reserve={reserve}
                            playerOptions={playerOptions2}
                            handleReserveChange={handleReserveChange}
                          />
                        </>
                      )}
                    </>
                  )}
                  <label>Bramkarz</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getGoalKeeper} />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getGoalKeeper} />
                  )}
                  <label>Kapitan</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getCapitan} />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getCapitan} />
                  )}
                </>
              )}

              <button
                className="btn primary-btn save"
                onClick={() => {
                  exportImg(Licenses, posters, user, poster, coords.type);
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
