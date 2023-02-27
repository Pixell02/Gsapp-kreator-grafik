import "./WorkSpace.css";
import { useCollection } from "../../../hooks/useCollection";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  deleteField,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import html2canvas from "html2canvas";
import Select from "react-select";
import MatchPoster from "./Canvas";
import background from "../../../img/back.png";
import posterBackground from "./posters.json";
import posterCoords from "./coords.json";
import StartingSquad from "./StartingSquad";
import GoalPoster from "./GoalPoster";
import MonthlySummary from "./MonthlySummary";
import TimeTable from "./TimeTable";
import verified from "../../../img/verified.png";
import discard from "../../../img/discard.png";
import EventAnnouncement from "./EventAnnouncement";
import watermarkImg from "../../../img/2.svg"

function WorkSpace() {
  const { poster } = useParams();

  const { user } = useAuthContext();
  const { documents: Licenses } = useCollection("user", [
    "uid",
    "==",
    user.uid,
  ]);
  
  const exportImg = () => {
    const image = document.querySelector(".canvas-container");  
    const canvasRes = document.querySelector("#canvas");
    if(Licenses[0].license === "free-trial"){
      const watermarkPlace = document.querySelectorAll(".canvas-container")[0];  
    const watermark = document.createElement("img");
    watermark.className = "watermark-img"
      watermark.src = watermarkImg;
      image.appendChild(watermark);
    
    }
    
    // canvasRes.style.opacity = "1";

    html2canvas(image, { scale: 1.25, useCORS: true, allowTaint: true }).then(
      (canvas) => {
        const dataURL = canvas.toDataURL("image/jpeg", 1.0);

        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = dataURL;
        link.click();

        const docRef = doc(db, "user", Licenses[0].id);
        if(Licenses[0].license ==="free-trial"){
        updateDoc(docRef, {
          numberOfFreeUse: Licenses[0].numberOfFreeUse - 1,
        });
      } 
        let checkLicense = [];
        const colRef = doc(db, "user", Licenses[0].id);
        getDoc(colRef).then((doc) => {
          checkLicense.push(doc.data());
          if (checkLicense[0].license === "free-trial") {
            if (checkLicense[0].numberOfFreeUse < 1) {
              updateDoc(docRef, {
                license: "no-license",
                numberOfFreeUse: deleteField(),
              });
            }
          }
        });
        if(Licenses[0].license === "free-trial"){
          document.querySelector(".watermark-img").remove();
        }
        posters.createdDate = Date.now();
        posters.user = user.uid;
    const generatorRef = collection(db, "generated")
      addDoc(generatorRef, posters)
    
      }
    );
  };

  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);

  const { documents: Opponent } = useCollection("Opponents", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: Players } = useCollection("Players", [
    "uid",
    "==",
    user.uid,
  ]);

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
        value: player.number + " " + player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      setFullPlayers(playerOption);
      setPlayerOption(playerOption);
      setSpecialPlayerOption(playerOption);
      playerOption2 = Players.map((player) => ({
        value:
          player.number +
          " " +
          player.firstName.toUpperCase() +
          " " +
          player.secondName.toUpperCase(),
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      setPlayerOption2(playerOption2);
      reserveOptions = Players.map((player) => ({
        value: player.secondName,
        label: player.number + " " + player.firstName + " " + player.secondName,
      }));
      reserveOptions2 = Players.map((player) => ({
        value:
          player.number +
          "." +
          player.firstName[0].toUpperCase() +
          " " +
          player.secondName,
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
  const [posterInfo, setPosterInfo] = useState({});


  useEffect(() => {
    const colRef = collection(db, "piecesOfPoster");
    const q = query(colRef, where("uuid", "==", poster));

    onSnapshot(q, (snapshot) => {
      let postersarray = [];
      snapshot.docs.forEach((doc) => {
        postersarray.push({ ...doc.data(), id: doc.id });
      });
      setThemeOption(
        postersarray.map((item) => ({ value: item.src, label: item.color }))
      );
    });
    if (poster === "4123XABIebkl34m496f4") {
      const docRef = collection(db, "yourCatalog");
      const q2 = query(docRef, where("uuid", "==", poster));

      onSnapshot(q2, (snapshot) => {
        let postersarray = [];
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
    }
  }, []);

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
  const [typeDate, setTypeDate] = useState("");

  const date = (e) => {
    setTypeDate(e.target.value);
  };
  const [typePlace, setTypePlace] = useState("");
  const place = (e) => {
    setTypePlace(e.target.value);
  };

  const [typeKolejka, setTypeKolejka] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());

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
  const [playerNameOne, setPlayerNameOne] = useState();

  const playerOne = (option) => {
    setPlayerNameOne(option.value);
    // let filtered = fullPlayers.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameTwo, setPlayerNameTwo] = useState();

  const playerTwo = (option) => {
    setPlayerNameTwo(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameThree, setPlayerNameThree] = useState();

  const playerThree = (option) => {
    setPlayerNameThree(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameFour, setPlayerNameFour] = useState();

  const playerFour = (option) => {
    setPlayerNameFour(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameFive, setPlayerNameFive] = useState();

  const playerFive = (option) => {
    setPlayerNameFive(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameSix, setPlayerNameSix] = useState();

  const playerSix = (option) => {
    setPlayerNameSix(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameSeven, setPlayerNameSeven] = useState();

  const playerSeven = (option) => {
    setPlayerNameSeven(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameEight, setPlayerNameEight] = useState();

  const playerEight = (option) => {
    setPlayerNameEight(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameNine, setPlayerNameNine] = useState();

  const playerNine = (option) => {
    setPlayerNameNine(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameTen, setPlayerNameTen] = useState();

  const playerTen = (option) => {
    setPlayerNameTen(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
  };
  const [playerNameEleven, setPlayerNameEleven] = useState();

  const playerEleven = (option) => {
    setPlayerNameEleven(option.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== option.value
    // );
    // setPlayerOption(filtered);
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
// useEffect(() => {
//     const image = document.querySelectorAll(".canvas-container")[0];  
//     if(image){
//     const watermark = document.createElement("img");
//     watermark.className = "watermark-img"
//       watermark.src = watermarkImg;
//       image.appendChild(watermark);
//     }
//   },[watermarkImg, dataURL, yourLogo])

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

  const [reserveOne, setReserveOne] = useState();
  const [reserveTwo, setReserveTwo] = useState();
  const [reserveThree, setReserveThree] = useState();
  const [reserveFour, setReserveFour] = useState();
  const [reserveFive, setReserveFive] = useState();
  const [reserveSix, setReserveSix] = useState();
  const [reserveSeven, setReserveSeven] = useState();

  const getReserveOne = (options) => {
    setReserveOne(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveTwo = (options) => {
    setReserveTwo(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveThree = (options) => {
    setReserveThree(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveFour = (options) => {
    setReserveFour(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveFive = (options) => {
    setReserveFive(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveSix = (options) => {
    setReserveSix(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };
  const getReserveSeven = (options) => {
    setReserveSeven(options.value);
    // let filtered = playerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setPlayerOption(filtered);
  };

  const [goalKeeper, setGoalKeeper] = useState();
  const [capitan, setCapitan] = useState();

  const getGoalKeeper = (options) => {
    setGoalKeeper(options.value);
    let filtered = specialPlayerOptions.filter(
      (player) => player.value !== options.value
    );
    setSpecialPlayerOption(filtered);
  };
  const getCapitan = (options) => {
    setCapitan(options.value);
    let filtered = specialPlayerOptions.filter(
      (player) => player.value !== options.value
    );
    setSpecialPlayerOption(filtered);
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
                opponentName={opponentName}
                playerOne={playerNameOne}
                playerTwo={playerNameTwo}
                playerThree={playerNameThree}
                playerFour={playerNameFour}
                playerFive={playerNameFive}
                playerSix={playerNameSix}
                playerSeven={playerNameSeven}
                playerEight={playerNameEight}
                playerNine={playerNameNine}
                playerTen={playerNameTen}
                playerEleven={playerNameEleven}
                reserveOne={reserveOne}
                reserveTwo={reserveTwo}
                reserveThree={reserveThree}
                reserveFour={reserveFour}
                reserveFive={reserveFive}
                reserveSix={reserveSix}
                reserveSeven={reserveSeven}
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
                  <label>Klasa</label>
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
                  <input
                    type="text"
                    onChange={date}
                    value={typeDate}
                    className="date-type"
                  />
                </>
              )}
              {/* Przeciwnicy */}
              {coords.opponentImageTop && (
                <>
                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
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
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerOneGoal}
                  />
                </>
              )}
              {coords && coords.yourPlayerTwoGoalTop && (
                <>
                  <label>Twój GOL 2</label>
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerTwoGoal}
                  />
                </>
              )}
              {coords && coords.yourPlayerThreeGoalTop && (
                <>
                  <label>Twój GOL 3</label>
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerThreeGoal}
                  />
                </>
              )}
              {coords && coords.yourPlayerFourGoalTop && (
                <>
                  <label>Twój GOL 4</label>
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerFourGoal}
                  />
                </>
              )}
              {coords && coords.yourPlayerFiveGoalTop && (
                <>
                  <label>Twój GOL 5</label>
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerFiveGoal}
                  />
                </>
              )}
              {coords && coords.yourPlayerSixGoalTop && (
                <>
                  <label>Twój GOL 6</label>
                  <Select
                    options={playerOptions}
                    onChange={getYourPlayerSixGoal}
                  />
                </>
              )}
              {/* Gole przeciwników */}

              {coords && coords.opponentPlayerOneGoalTop && (
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
              )}

              {/*  */}
              {coords.playerOneTop && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                <>
                  <p style={{ marginTop: "20px" }}>Zawodnicy</p>
                  <label>Zawodnik 1</label>
                  <Select options={playerOptions} onChange={playerOne} />
                  <label>Zawodnik 2</label>
                  <Select options={playerOptions} onChange={playerTwo} />
                  <label>Zawodnik 3</label>
                  <Select options={playerOptions} onChange={playerThree} />
                  <label>Zawodnik 4</label>
                  <Select options={playerOptions} onChange={playerFour} />
                  <label>Zawodnik 5</label>
                  <Select options={playerOptions} onChange={playerFive} />
                  <label>Zawodnik 6</label>
                  <Select options={playerOptions} onChange={playerSix} />
                  <label>Zawodnik 7</label>
                  <Select options={playerOptions} onChange={playerSeven} />
                  <label>Zawodnik 8</label>
                  <Select options={playerOptions} onChange={playerEight} />
                  <label>Zawodnik 9</label>
                  <Select options={playerOptions} onChange={playerNine} />
                  <label>Zawodnik 10</label>
                  <Select options={playerOptions} onChange={playerTen} />
                  <label>Zawodnik 11</label>
                  <Select options={playerOptions} onChange={playerEleven} />
                </>
              )}
              {coords.playerOneTop && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                <>
                  <p style={{ marginTop: "20px" }}>Zawodnicy</p>
                  <label>Zawodnik 1</label>
                  <Select options={playerOptions2} onChange={playerOne} />
                  <label>Zawodnik 2</label>
                  <Select options={playerOptions2} onChange={playerTwo} />
                  <label>Zawodnik 3</label>
                  <Select options={playerOptions2} onChange={playerThree} />
                  <label>Zawodnik 4</label>
                  <Select options={playerOptions2} onChange={playerFour} />
                  <label>Zawodnik 5</label>
                  <Select options={playerOptions2} onChange={playerFive} />
                  <label>Zawodnik 6</label>
                  <Select options={playerOptions2} onChange={playerSix} />
                  <label>Zawodnik 7</label>
                  <Select options={playerOptions2} onChange={playerSeven} />
                  <label>Zawodnik 8</label>
                  <Select options={playerOptions2} onChange={playerEight} />
                  <label>Zawodnik 9</label>
                  <Select options={playerOptions2} onChange={playerNine} />
                  <label>Zawodnik 10</label>
                  <Select options={playerOptions2} onChange={playerTen} />
                  <label>Zawodnik 11</label>
                  <Select options={playerOptions2} onChange={playerEleven} />
                </>
              )}

              {posters && posters.type === "STARTING-SQUAD" && (
                <>
                  {Players && (
                    <>
                      <p style={{ marginTop: "20px" }}>Rezerwowi</p>
                      {poster === "6JftCRHQYUItjEz55Rn1" && (
                        <>
                          <label>Rezerwowy 1</label>
                          <Select
                            options={reserveTwoOptions}
                            onChange={getReserveOne}
                          />
                          <label>Rezerwowy 2</label>
                          <Select
                            options={reserveTwoOptions}
                            onChange={getReserveTwo}
                          />
                          <label>Rezerwowy 3</label>
                          <Select
                            options={reserveTwoOptions}
                            onChange={getReserveSix}
                          />
                          <label>Rezerwowy 4</label>
                          <Select
                            options={reserveTwoOptions}
                            onChange={getReserveSeven}
                          />
                        </>
                      )}
                      {poster !== "6JftCRHQYUItjEz55Rn1" && (
                        <>
                          <label>Rezerwowy 1</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveOne}
                          />
                          <label>Rezerwowy 2</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveTwo}
                          />
                          <label>Rezerwowy 3</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveThree}
                          />
                          <label>Rezerwowy 4</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveFour}
                          />
                          <label>Rezerwowy 5</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveFive}
                          />
                          <label>Rezerwowy 6</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveSix}
                          />
                          <label>Rezerwowy 7</label>
                          <Select
                            options={playerOptions}
                            onChange={getReserveSeven}
                          />
                        </>
                      )}
                    </>
                  )}
                  <label>Bramkarz</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select
                      options={specialPlayerOptions}
                      onChange={getGoalKeeper}
                    />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getGoalKeeper} />
                  )}
                  <label>Kapitan</label>
                  {poster && poster !== "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select
                      options={specialPlayerOptions}
                      onChange={getCapitan}
                    />
                  )}
                  {poster && poster === "IxOg6DyMuo9gTvv8BJK9" && (
                    <Select options={playerOptions2} onChange={getCapitan} />
                  )}
                </>
              )}
              <button
                className="btn primary-btn save"
                onClick={() => exportImg()}
              >
                Zapisz
              </button>
            </div>
            {Licenses && Licenses[0].license === "free-trial" && (
              <div className="license-place">
                <span className="license-content">
                  Masz jeszcze {Licenses[0].numberOfFreeUse} darmowych użyć
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
