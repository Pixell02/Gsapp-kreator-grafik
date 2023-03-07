import "./WorkSpace.css";
import { useCollection } from "../../hooks/useCollection";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getDoc, doc, onSnapshot, updateDoc, deleteField, collection, query, where, addDoc } from "firebase/firestore";

import { db } from "../../firebase/config";
import html2canvas from "html2canvas";
import Select from "react-select";
import MatchPoster from "./Canvas";
import background from "../../img/back.png";
import posterCoords from "./coords.json";
import StartingSquad from "./StartingSquad";
import GoalPoster from "./GoalPoster";
// import watermarkImg from "../../img/2.svg";
import { exportImg } from "./components/exportImg";
import useCreateYourTeamGoals from "./hooks2/useCreateYourTeamGoals";
import ReservePlayers from "./components/ReservePlayers";
import useReservePlayer from "./hooks2/useReservePlayer";
import useCreateOpponentGoals from "./hooks2/useCreateOpponentGoals";

function WorkSpace() {
  const { poster } = useParams();

  const { user } = useAuthContext();
  const { documents: Licenses } = useCollection("user", ["uid", "==", user.uid]);

  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);

  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);

  const [teamOption, setTeamOption] = useState([]);
  const [yourTeamGoal, handleGoalChange] = useCreateYourTeamGoals(Array(6).fill());
  const [opponentGoals, handleOpponentGoalChange, handleOpponentMinuteChange, opponentGoalMinute] =
    useCreateOpponentGoals(Array(6).fill());
  const [reserve, handleReserveChange] = useReservePlayer(Array(7).fill());

  useEffect(() => {
    if (Logo) {
      const TeamOption = Logo.map((logo) => ({
        value: logo.firstName + " " + logo.secondName,
        label: logo.firstName + " " + logo.secondName,
      }));
      setTeamOption(TeamOption);
    }
  }, [Logo]);

  let options;

  if (Opponent) {
    options = Opponent.map((opponent) => ({
      value: opponent.img,
      label: opponent.firstName + " " + opponent.secondName,
    }));
  }
  const [playerOptions, setPlayerOption] = useState([]);
  const [fullPlayers, setFullPlayers] = useState([]);
  const [playerOptions2, setPlayerOption2] = useState([]);
  const [specialPlayerOptions, setSpecialPlayerOption] = useState([]);
  const [specialPlayerOptions2, setSpecialPlayerOption2] = useState([]);
  const [reserveTwoOptions, setReserveTwoOptions] = useState([]);

  let playerOption;
  let playerOption2;
  let reserveOptions;
  let reserveOptions2;
  useEffect(() => {
    if (Players) {
      playerOption = Players.map((player) => ({
        value: player.number + "." + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      setFullPlayers(playerOption);
      setPlayerOption(playerOption);
      setSpecialPlayerOption(playerOption);
      playerOption2 = Players.map((player) => ({
        value: player.number + " " + player.firstName.toUpperCase() + " " + player.secondName.toUpperCase(),
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

      setReserveTwoOptions(reserveOptions2);
    }
  }, [Players]);
  const [opponent, setOpponent] = useState();
  const [opponentName, setOpponentName] = useState();

  const [posters, setPosters] = useState();

  const [themeOption, setThemeOption] = useState([]);
  const [selectThemes, setSelectThemes] = useState();
  const [selectPlayerTheme, setSelectPlayerThemes] = useState([]);
  useEffect(() => {
    if (selectPlayerTheme) {
      setSelectPlayerThemes([...selectPlayerTheme].sort((a, b) => a.label.localeCompare(b.label)));
    }
  }, [posters]);

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

  const [coords, setCoords] = useState();
  useEffect(() => {
    posterCoords.map((postersCoords) => {
      if (postersCoords.id === poster) {
        setCoords(postersCoords);
      }
    });
  }, []);

  const [yourLogo, setYourLogo] = useState();

  useEffect(() => {
    if (Logo) {
      if (Logo.length > 0) {
        fetch(`${Logo[0].img}`)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              setYourLogo(reader.result);
            };
          });
      }
    }
  }, [Logo, yourLogo]);

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
  const getTeamOption = (option) => {
    setYourLogo(option.value);
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

  const [yourPlayerOneGoal, setYourPlayerOneGoal] = useState();

  const getYourPlayerOneGoal = (option) => {
    setYourPlayerOneGoal(option.value);
  };
  const [yourPlayerTwoGoal, setYourPlayerTwoGoal] = useState();

  const getYourPlayerTwoGoal = (option) => {
    setYourPlayerTwoGoal(option.value);
  };
  const [yourPlayerThreeGoal, setYourPlayerThreeGoal] = useState();

  const getYourPlayerThreeGoal = (option) => {
    setYourPlayerThreeGoal(option.value);
  };
  const [yourPlayerFourGoal, setYourPlayerFourGoal] = useState();

  const getYourPlayerFourGoal = (option) => {
    setYourPlayerFourGoal(option.value);
  };
  const [yourPlayerFiveGoal, setYourPlayerFiveGoal] = useState();

  const getYourPlayerFiveGoal = (option) => {
    setYourPlayerFiveGoal(option.value);
  };
  const [yourPlayerSixGoal, setYourPlayerSixGoal] = useState();

  const getYourPlayerSixGoal = (option) => {
    setYourPlayerSixGoal(option.value);
  };

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

  const [opponentGoalOneName, setOpponentGoalOneName] = useState();
  const [opponentGoalTwoName, setOpponentGoalTwoName] = useState();
  const [opponentGoalThreeName, setOpponentGoalThreeName] = useState();
  const [opponentGoalFourName, setOpponentGoalFourName] = useState();
  const [opponentGoalFiveName, setOpponentGoalFiveName] = useState();
  const [opponentGoalSixName, setOpponentGoalSixName] = useState();

  const getOpponentGoalOne = (e) => {
    setOpponentGoalOneName(e.target.value);
  };
  const getOpponentGoalTwo = (e) => {
    setOpponentGoalTwoName(e.target.value);
  };
  const getOpponentGoalThree = (e) => {
    setOpponentGoalThreeName(e.target.value);
  };
  const getOpponentGoalFour = (e) => {
    setOpponentGoalFourName(e.target.value);
  };
  const getOpponentGoalFive = (e) => {
    setOpponentGoalFiveName(e.target.value);
  };
  const getOpponentGoalSix = (e) => {
    setOpponentGoalSixName(e.target.value);
  };

  const [league, setLeague] = useState();

  const getLeague = (e) => {
    setLeague(e.target.value);
  };

  const [radioChecked, setRadioChecked] = useState("radio1");

  const [squadPlayers, setSquadPlayers] = useState(Array(11).fill());
  const handlePlayerChange = (option, i) => {
    const newPlayerValue = [...squadPlayers];
    newPlayerValue[i] = option.value;
    setSquadPlayers(newPlayerValue);
  };

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
            {posters && posters.type === "GOOOOL" && yourLogo && (
              <GoalPoster
                posterBackGround={dataURL}
                coords={coords}
                yourPlayer={yourPlayer}
                yourTeamImage={yourLogo}
                themeOption={selectThemes}
                yourTeamResult={yourTeamResult}
                yourOpponentResult={yourOpponentResult}
                yourLogo={Logo}
                opponent={opponent}
                radioChecked={radioChecked}
                id={posters}
              />
            )}

            {posters && posters.type === "MATCH-POSTER" && yourLogo && (
              <MatchPoster
                id={posters}
                posterBackGround={dataURL}
                opponent={opponent}
                yourTeamImage={yourLogo}
                yourLogo={Logo}
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

            {posters && posters.type === "STARTING-SQUAD" && yourLogo && (
              <StartingSquad
                posterBackGround={dataURL}
                opponent={opponent}
                yourLogo={Logo}
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
            {posters && posters.type === "RESULT" && yourLogo && (
              <MatchPoster
                posterBackGround={dataURL}
                opponent={opponent}
                yourLogo={Logo}
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
                yourPlayerOneGoal={yourPlayerOneGoal}
                yourPlayerTwoGoal={yourPlayerTwoGoal}
                yourPlayerThreeGoal={yourPlayerThreeGoal}
                yourPlayerFourGoal={yourPlayerFourGoal}
                yourPlayerFiveGoal={yourPlayerFiveGoal}
                yourPlayerSixGoal={yourPlayerSixGoal}
                yourTeamResult={yourTeamResult}
                yourOpponentResult={yourOpponentResult}
                opponentGoalOneName={opponentGoalOneName}
                opponentGoalTwoName={opponentGoalTwoName}
                opponentGoalThreeName={opponentGoalThreeName}
                opponentGoalFourName={opponentGoalFourName}
                opponentGoalFiveName={opponentGoalFiveName}
                opponentGoalSixName={opponentGoalSixName}
              />
            )}
          </div>
          <div className="tools-container">
            <div className="workspace-title">
              <span className="workspace-title-container">Kreator</span>
            </div>
            <div className="ms-5 me-5 mt-3">
              {/* Właściwy workspace */}

              {/* gospodarz / przeciwnik */}

              {coords.opponentImageTop && (
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
              {/* {teamOption && teamOption.length > 1 && (
                <>
                <label>Twoje drużyny</label>
                <Select options={teamOption} onChange={getTeamOption} />
                </>
              )} */}

              {/* Kolejka */}

              {coords.yourKolejkaTop && (
                <>
                  <label>Kolejka</label>
                  <input type="text" value={typeKolejka} onChange={kolejka} />
                </>
              )}

              {/* Klasa / Liga */}
              {coords.yourLeagueTop && (
                <>
                  <label>Klasa / Liga</label>
                  <input type="text" value={league} onChange={getLeague} />
                </>
              )}
              {/* Miejsce */}
              {coords.typePlaceTop && (
                <>
                  <label>Miejsce</label>
                  <input type="text" value={typePlace} onChange={place} />
                </>
              )}
              {/* Data */}
              {coords.typeDataTop && (
                <>
                  <label>Data i godzina</label>
                  <input type="text" onChange={date} value={typeDate} className="date-type" />
                </>
              )}
              {/* Przeciwnicy */}
              {coords.opponentImageTop && (
                <>
                  <label>Przeciwnicy</label>
                  {Opponent && <Select options={options} onChange={setOpponentLogo} />}
                </>
              )}
              {/* Wynik*/}
              {coords.yourTeamResultTop && (
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
              {coords.playerTop && (
                <>
                  <label>Zawodnik</label>
                  <Select options={playerOptions} onChange={getYourPlayer} />
                </>
              )}

              {/* GOLE zawodników */}

              {coords && coords.yourPlayerOneGoalTop && (
                <>
                  <p className="mt-2">Gole zawodników</p>
                  <label>Twój GOL 1</label>
                  <Select options={playerOptions} onChange={getYourPlayerOneGoal} />
                </>
              )}
              {coords && coords.yourPlayerTwoGoalTop && (
                <>
                  <label>Twój GOL 2</label>
                  <Select options={playerOptions} onChange={getYourPlayerTwoGoal} />
                </>
              )}
              {coords && coords.yourPlayerThreeGoalTop && (
                <>
                  <label>Twój GOL 3</label>
                  <Select options={playerOptions} onChange={getYourPlayerThreeGoal} />
                </>
              )}
              {coords && coords.yourPlayerFourGoalTop && (
                <>
                  <label>Twój GOL 4</label>
                  <Select options={playerOptions} onChange={getYourPlayerFourGoal} />
                </>
              )}
              {coords && coords.yourPlayerFiveGoalTop && (
                <>
                  <label>Twój GOL 5</label>
                  <Select options={playerOptions} onChange={getYourPlayerFiveGoal} />
                </>
              )}
              {coords && coords.yourPlayerSixGoalTop && (
                <>
                  <label>Twój GOL 6</label>
                  <Select options={playerOptions} onChange={getYourPlayerSixGoal} />
                </>
              )}
              {/* Gole przeciwników */}

              {coords &&
                coords.opponentPlayerOneGoalTop &&
                opponentGoals.map((goal, i) => (
                  <div key={i} className="goal-container">
                    <div className="minute-container">
                      <label htmlFor={`input${i}`}>Minuta</label>
                      <input id={`imput${i}`} type="number" onChange={(e) => handleOpponentMinuteChange(e, i)} />
                    </div>
                    <div className="goal-contaienr">
                      <label htmlFor={`select${i}`}>GOL przeciwnika</label>
                      <input type="text" onChange={(e) => handleOpponentGoalChange(e, i)} />
                    </div>
                  </div>
                ))}
              {/* {coords && coords.opponentPlayerOneGoalTop && (
                <>
                  <p className="mt-2">Gole przeciwników</p>
                  <label> GOL przeciwnika 1</label>
                  <input
                    type="text"
                    value={opponentGoalOneName}
                    onChange={getOpponentGoalOne}
                  />
                </>
              )}
              {coords && coords.opponentPlayerTwoGoalTop && (
                <>
                  <label> GOL przeciwnika 2</label>
                  <input
                    type="text"
                    value={opponentGoalTwoName}
                    onChange={getOpponentGoalTwo}
                  />
                </>
              )}
              {coords && coords.opponentPlayerThreeGoalTop && (
                <>
                  <label> GOL przeciwnika 3</label>
                  <input
                    type="text"
                    value={opponentGoalThreeName}
                    onChange={getOpponentGoalThree}
                  />
                </>
              )}
              {coords && coords.opponentPlayerFourGoalTop && (
                <>
                  <label> GOL przeciwnika 4</label>
                  <input
                    type="text"
                    value={opponentGoalFourName}
                    onChange={getOpponentGoalFour}
                  />
                </>
              )}
              {coords && coords.opponentPlayerFiveGoalTop && (
                <>
                  <label> GOL przeciwnika 5</label>
                  <input
                    type="text"
                    value={opponentGoalFiveName}
                    onChange={getOpponentGoalFive}
                  />
                </>
              )}
              {coords && coords.opponentPlayerSixGoalTop && (
                <>
                  <label> GOL przeciwnika 6</label>
                  <input
                    type="text"
                    value={opponentGoalSixName}
                    onChange={getOpponentGoalSix}
                  />
                </>
              )} */}

              {/*  */}
              {coords.playerOneTop && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                <>
                  <p style={{ marginTop: "20px" }}>Zawodnicy</p>

                  {squadPlayers &&
                    squadPlayers.map((player, i) => (
                      <>
                        <div key={i}>
                          <label htmlFor={`select${i}`}>Zawodnik {i + 1}</label>

                          <Select
                            id={`select${i}`}
                            options={playerOptions}
                            onChange={(option) => handlePlayerChange(option, i)}
                          />
                        </div>
                      </>
                    ))}
                </>
              )}
              {coords.playerOneTop && poster === "IxOg6DyMuo9gTvv8BJK9" && (
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

                      {coords.reserveOneTop && (
                        // <>
                        //   <label>Rezerwowy 1</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveOne}
                        //   />
                        //   <label>Rezerwowy 2</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveTwo}
                        //   />
                        //   <label>Rezerwowy 3</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveThree}
                        //   />
                        //   <label>Rezerwowy 4</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveFour}
                        //   />
                        //   <label>Rezerwowy 5</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveFive}
                        //   />
                        //   <label>Rezerwowy 6</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveSix}
                        //   />
                        //   <label>Rezerwowy 7</label>
                        //   <Select
                        //     options={playerOptions}
                        //     onChange={getReserveSeven}
                        //   />
                        // </>
                        <ReservePlayers
                          reserve={reserve}
                          playerOptions={playerOptions}
                          handleReserveChange={handleReserveChange}
                        />
                      )}
                    </>
                  )}
                  <label>Bramkarz</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={specialPlayerOptions} onChange={getGoalKeeper} />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getGoalKeeper} />
                  )}
                  <label>Kapitan</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={specialPlayerOptions} onChange={getCapitan} />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getCapitan} />
                  )}
                </>
              )}
              <button className="btn primary-btn save" onClick={() => exportImg(Licenses, posters, user, poster)}>
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
