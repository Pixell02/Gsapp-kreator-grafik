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
    html2canvas(image, { scale: 1.25 }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = dataURL;
      link.click();
      const docRef = doc(db, "user", Licenses[0].id);
      updateDoc(docRef, {
        numberOfFreeUse: Licenses[0].numberOfFreeUse - 1,
      });
      let checkLicense = [];
      const colRef = doc(db, "user", Licenses[0].id);
      getDoc(colRef).then((doc) => {
        checkLicense.push(doc.data());
        if(checkLicense[0].license == "free-trial") {
          if (checkLicense[0].numberOfFreeUse < 1) {
          updateDoc(docRef, {
            license: "no-license",
            numberOfFreeUse: deleteField(),
          });
        }
        
        }
      });
    });
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
  let playerOptions;
  let reserveOptions;
  if (Players) {
    playerOptions = Players.map((player) => ({
      value: player.number + " " + player.secondName,
      label: player.number + " " + player.firstName + " " + player.secondName,
    }));
    reserveOptions = Players.map((player) => ({
      value: player.secondName,
      label: player.number + " " + player.firstName + " " + player.secondName,
    }));
  }
  const [opponent, setOpponent] = useState();
  const [opponentName, setOpponentName] = useState();

  const [posters, setPosters] = useState();

  // Getting background

  useEffect(() => {
    const addBackground = () => {
      const docRef = doc(db, "piecesOfPoster", poster);
      getDoc(docRef).then((doc) => {
        setPosters(doc.data());
      });
    };

    addBackground();
  }, []);

  const [coords, setCoords] = useState();
  useEffect(() => {
    posterCoords.map((postersCoords) => {
      if (postersCoords.id == poster) {
        setCoords(postersCoords);
      }
    });
  }, []);

  const [yourLogo, setYourLogo] = useState();

  const setOpponentLogo = (option) => {
    setOpponent(option.value);
    setOpponentName(option.label);
  };
  const [typeDate, setTypeDate] = useState("");

  const date = (e) => {
    setTypeDate(e.target.value);
  };
  const [typePlace, setTypePlace] = useState("");
  const place = (e) => {
    setTypePlace(e.target.value);
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
  };
  const [playerNameTwo, setPlayerNameTwo] = useState();

  const playerTwo = (option) => {
    setPlayerNameTwo(option.value);
  };
  const [playerNameThree, setPlayerNameThree] = useState();

  const playerThree = (option) => {
    setPlayerNameThree(option.value);
  };
  const [playerNameFour, setPlayerNameFour] = useState();

  const playerFour = (option) => {
    setPlayerNameFour(option.value);
  };
  const [playerNameFive, setPlayerNameFive] = useState();

  const playerFive = (option) => {
    setPlayerNameFive(option.value);
  };
  const [playerNameSix, setPlayerNameSix] = useState();

  const playerSix = (option) => {
    setPlayerNameSix(option.value);
  };
  const [playerNameSeven, setPlayerNameSeven] = useState();

  const playerSeven = (option) => {
    setPlayerNameSeven(option.value);
  };
  const [playerNameEight, setPlayerNameEight] = useState();

  const playerEight = (option) => {
    setPlayerNameEight(option.value);
  };
  const [playerNameNine, setPlayerNameNine] = useState();

  const playerNine = (option) => {
    setPlayerNameNine(option.value);
  };
  const [playerNameTen, setPlayerNameTen] = useState();

  const playerTen = (option) => {
    setPlayerNameTen(option.value);
  };
  const [playerNameEleven, setPlayerNameEleven] = useState();

  const playerEleven = (option) => {
    setPlayerNameEleven(option.value);
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

  const [reserveOne, setReserveOne] = useState();
  const [reserveTwo, setReserveTwo] = useState();
  const [reserveThree, setReserveThree] = useState();
  const [reserveFour, setReserveFour] = useState();
  const [reserveFive, setReserveFive] = useState();
  const [reserveSix, setReserveSix] = useState();
  const [reserveSeven, setReserveSeven] = useState();

  const getReserveOne = (options) => {
    setReserveOne(options.value);
  };
  const getReserveTwo = (options) => {
    setReserveTwo(options.value);
  };
  const getReserveThree = (options) => {
    setReserveThree(options.value);
  };
  const getReserveFour = (options) => {
    setReserveFour(options.value);
  };
  const getReserveFive = (options) => {
    setReserveFive(options.value);
  };
  const getReserveSix = (options) => {
    setReserveSix(options.value);
  };
  const getReserveSeven = (options) => {
    setReserveSeven(options.value);
  };

  // Monthly

  const [dateOne, setDateOne] = useState();
  const [hourOne, setHourOne] = useState();
  const [opponentOne, setOpponentOne] = useState();
  const [yourResultOne, setYourResultOne] = useState();
  const [opponentResultOne, setOpponentResultOne] = useState();

  const getDateOne = (e) => {
    setDateOne(e.target.value);
  };
  const getHourOne = (e) => {
    setHourOne(e.target.value);
  };
  const getOpponentOne = (options) => {
    setOpponentOne(options.label);
  };
  const getYourResultOne = (e) => {
    setYourResultOne(e.target.value);
  };
  const getOpponentResultOne = (e) => {
    setOpponentResultOne(e.target.value);
  };

  const [dateTwo, setDateTwo] = useState();
  const [hourTwo, setHourTwo] = useState();
  const [opponentTwo, setOpponentTwo] = useState();
  const [yourResultTwo, setYourResultTwo] = useState();
  const [opponentResultTwo, setOpponentResultTwo] = useState();

  const getDateTwo = (e) => {
    setDateTwo(e.target.value);
  };
  const getHourTwo = (e) => {
    setHourTwo(e.target.value);
  };
  const getOpponentTwo = (options) => {
    setOpponentTwo(options.label);
  };
  const getYourResultTwo = (e) => {
    setYourResultTwo(e.target.value);
  };
  const getOpponentResultTwo = (e) => {
    setOpponentResultTwo(e.target.value);
  };

  const [dateThree, setDateThree] = useState();
  const [hourThree, setHourThree] = useState();
  const [opponentThree, setOpponentThree] = useState();
  const [yourResultThree, setYourResultThree] = useState();
  const [opponentResultThree, setOpponentResultThree] = useState();

  const getDateThree = (e) => {
    setDateThree(e.target.value);
  };
  const getHourThree = (e) => {
    setHourThree(e.target.value);
  };
  const getOpponentThree = (options) => {
    setOpponentThree(options.label);
  };
  const getYourResultThree = (e) => {
    setYourResultThree(e.target.value);
  };
  const getOpponentResultThree = (e) => {
    setOpponentResultThree(e.target.value);
  };
  const [dateFour, setDateFour] = useState();
  const [hourFour, setHourFour] = useState();
  const [opponentFour, setOpponentFour] = useState();
  const [yourResultFour, setYourResultFour] = useState();
  const [opponentResultFour, setOpponentResultFour] = useState();

  const getDateFour = (e) => {
    setDateFour(e.target.value);
  };
  const getHourFour = (e) => {
    setHourFour(e.target.value);
  };
  const getOpponentFour = (options) => {
    setOpponentFour(options.label);
  };
  const getYourResultFour = (e) => {
    setYourResultFour(e.target.value);
  };
  const getOpponentResultFour = (e) => {
    setOpponentResultFour(e.target.value);
  };

  const [radioOne, setRadioOne] = useState("gospodarz");
  const [radioTwo, setRadioTwo] = useState("gospodarz");
  const [radioThree, setRadioThree] = useState("gospodarz");
  const [radioFour, setRadioFour] = useState("gospodarz");

  const [month, setMonth] = useState();

  const getMonth = (options) => {
    setMonth(options.label);
  };
  const [league, setLeague] = useState();

  const getLeague = (e) => {
    setLeague(e.target.value);
  };

  return (
    <>
      {Licenses && Licenses[0].license == "no-license" && (
        <div className="license-content">
          <p>
            Brak licencji <Link to="/offer">Kup dostęp</Link>
          </p>
        </div>
      )}
      {Licenses && Licenses[0].license !== "no-license" && (
        <div className="workspace-container">
          <div className="preview-container">
            {poster && poster == "63b5fb36a490e8f93beeae34" && Logo && (
              <MatchPoster
                id={posters}
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}
            {posters && posters.type == "GOOOOL" && Logo && (
              <GoalPoster
                posterBackGround={posters}
                coords={coords}
                yourPlayer={yourPlayer}
              />
            )}
            {posters && posters.type === "MATCH-DAY" && Logo && (
              <MatchPoster
                id={posters}
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}

            {posters && posters.type === "TOMMOROW-MATCH" && Logo && (
              <MatchPoster
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}
            {posters && posters.type === "MATCH-POSTER" && Logo && (
              <MatchPoster
                id={posters}
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}

            {posters && posters.type === "STARTING-SQUAD" && Logo && (
              <StartingSquad
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
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
              />
            )}
            {posters && posters.type === "RESULT" && Logo && (
              <MatchPoster
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
                yourTeamResult={yourTeamResult}
                yourOpponentResult={yourOpponentResult}
              />
            )}
            {posters && posters.type === "TIMETABLE" && Logo && (
              <TimeTable
                posterBackGround={posters}
                opponent={opponent}
                yourTeamName={Logo}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
                dateOne={dateOne}
                dateTwo={dateTwo}
                dateThree={dateThree}
                dateFour={dateFour}
                hourOne={hourOne}
                hourTwo={hourTwo}
                hourThree={hourThree}
                hourFour={hourFour}
                opponentOne={opponentOne}
                opponentTwo={opponentTwo}
                opponentThree={opponentThree}
                opponentFour={opponentFour}
              />
            )}
            {posters && posters.type === "TICKET" && Logo && (
              <MatchPoster
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}
            {posters && posters.type === "MONTHLY-SUMMARY" && Logo && (
              <MonthlySummary
                posterBackGround={posters}
                coords={coords}
                dateOne={dateOne}
                dateTwo={dateTwo}
                dateThree={dateThree}
                dateFour={dateFour}
                hourOne={hourOne}
                hourTwo={hourTwo}
                hourThree={hourThree}
                hourFour={hourFour}
                opponentOne={opponentOne}
                opponentTwo={opponentTwo}
                opponentThree={opponentThree}
                opponentFour={opponentFour}
                yourResultOne={yourResultOne}
                yourResultTwo={yourResultTwo}
                yourResultThree={yourResultThree}
                yourResultFour={yourResultFour}
                opponentResultOne={opponentResultOne}
                opponentResultTwo={opponentResultTwo}
                opponentResultThree={opponentResultThree}
                opponentResultFour={opponentResultFour}
                yourTeamName={Logo}
                month={month}
                league={league}
                radioOne={radioOne}
                radioTwo={radioTwo}
                radioThree={radioThree}
                radioFour={radioFour}
              />
            )}
            {posters && posters.type === "TRAINERS" && Logo && (
              <MatchPoster
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}
            {posters && posters.type === "EVENT-ANNOUNCEMENT" && Logo && (
              <EventAnnouncement
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                league={league}
                place={typePlace}
                date={typeDate}
                opponentName={opponentName}
              />
            )}
            {posters && posters.type === "COMPETITOR-PRESENTATION" && Logo && (
              <MatchPoster
                posterBackGround={posters}
                opponent={opponent}
                yourLogo={Logo}
                coords={coords}
                date={typeDate}
                place={typePlace}
                opponentName={opponentName}
              />
            )}
          </div>
          <div className="tools-container">
            <div className="workspace-title">
              <span className="workspace-title-container">Kreator</span>
            </div>
            <div className="ms-5 me-5 mt-3">
              {posters && posters.type === "MATCH-DAY" && (
                <>
                  <label>Data</label>
                  <input
                    type="text"
                    onChange={date}
                    value={typeDate}
                    className="date-type"
                  />
                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}

              {posters && posters.type === "MATCH-POSTER" && (
                <>
                  <label>Miejsce</label>
                  <input type="text" value={typePlace} onChange={place} />
                  <label>Data i godzina</label>
                  <input
                    type="text"
                    onChange={date}
                    value={typeDate}
                    className="date-type"
                  />

                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "TOMMOROW-MATCH" && (
                <>
                  <label>Data i miejsce</label>
                  <input
                    type="text"
                    onChange={date}
                    value={typeDate}
                    className="date-type"
                  />

                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "GOOOOL" && (
                <>
                  {Players && (
                    <>
                      <label>Zawodnik</label>
                      <Select
                        options={playerOptions}
                        onChange={getYourPlayer}
                      />
                    </>
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "RESULT" && (
                <>
                  {posters.uid !== "YfwG3U5L7RLVLndyqjXu" && posters.uid !== "1wlpmf0KyPSGbmzxY8hK" && (
                    <>
                      <label>Data i miejsce</label>
                      <input
                        type="text"
                        onChange={date}
                        value={typeDate}
                        className="date-type"
                      />
                    </>
                  )}
                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
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
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "STARTING-SQUAD" && (
                <>
                  <label>Data i miejsce</label>
                  <input
                    type="text"
                    onChange={date}
                    value={typeDate}
                    className="date-type"
                  />
                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  {Players && (
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
                  {Players && (
                    <>
                      <p style={{ marginTop: "20px" }}>Rezerwowi</p>
                      <label>Rezerwowy 1</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveOne}
                      />
                      <label>Rezerwowy 2</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveTwo}
                      />
                      <label>Rezerwowy 3</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveThree}
                      />
                      <label>Rezerwowy 4</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveFour}
                      />
                      <label>Rezerwowy 5</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveFive}
                      />
                      <label>Rezerwowy 6</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveSix}
                      />
                      <label>Rezerwowy 7</label>
                      <Select
                        options={reserveOptions}
                        onChange={getReserveSeven}
                      />
                    </>
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "TIMETABLE" && (
                <>
                  <p>Nie działa</p>
                  <label>Miesiąc</label>
                  <Select
                    options={[
                      { label: "styczeń", value: "styczeń" },
                      { label: "luty", value: "luty" },
                      { label: "marzec", value: "marzec" },
                      { label: "kwiecień", value: "kwiecień" },
                      { label: "maj", value: "maj" },
                      { label: "czerwiec", value: "czerwiec" },
                      { label: "lipiec", value: "lipiec" },
                      { label: "sierpień", value: "sierpień" },
                      { label: "wrzesień", value: "wrzesień" },
                      { label: "październik", value: "październik" },
                      { label: "listopad", value: "listopad" },
                      { label: "grudzień", value: "grudzień" },
                    ]}
                    onChange={getMonth}
                  />
                  <div className="match-container">
                    <label>
                      <span>Mecz 1</span>
                      <br />
                      <input
                        name="group1"
                        type="radio"
                        value="gospodarz"
                        onChange={setRadioOne}
                        checked={radioOne == "gospodarz"}
                      />
                      <span>Gospodarz</span>
                      <input
                        name="group1"
                        type="radio"
                        value="gosc"
                        onChange={setRadioOne}
                        checked={radioOne == "gosc"}
                      />
                      <span>Gość</span>
                      <br />
                      <br />
                      <span>Dzień i miesiąc</span>
                      <input type="text" />
                      <span>Godzina</span>
                      <input type="text" />
                      <span>Przeciwnik</span>
                      {Opponent && (
                        <Select options={options} onChange={setOpponentLogo} />
                      )}
                    </label>
                  </div>
                  <div className="match-container">
                    <label>
                      <span>Mecz 2</span>
                      <br />
                      <input
                        type="radio"
                        name="group2"
                        value="gospodarz"
                        onChange={setRadioTwo}
                        checked={radioTwo == "gospodarz"}
                      />
                      <span>Gospodarz</span>
                      <input
                        type="radio"
                        name="group2"
                        value="gosc"
                        onChange={setRadioTwo}
                        checked={radioTwo == "gosc"}
                      />
                      <span>Gość</span>
                      <br />
                      <br />
                      <span>Dzień i miesiąc</span>
                      <input type="text" />
                      <span>Godzina</span>
                      <input type="text" />
                      <span>Przeciwnik</span>
                      {Opponent && (
                        <Select options={options} onChange={setOpponentLogo} />
                      )}
                    </label>
                  </div>
                  <div className="match-container">
                    <label>
                      <span>Mecz 3</span>
                      <br />
                      <input
                        type="radio"
                        name="group3"
                        value="gospodarz"
                        onChange={setRadioThree}
                        checked={radioThree == "gospodarz"}
                      />
                      <span>Gospodarz</span>
                      <input
                        type="radio"
                        name="group3"
                        value="gosc"
                        onChange={setRadioThree}
                        checked={radioThree == "gosc"}
                      />
                      <span>Gość</span>
                      <br />
                      <br />
                      <span>Dzień i miesiąc</span>
                      <input type="text" />
                      <span>Godzina</span>
                      <input type="text" />
                      <span>Przeciwnik</span>
                      {Opponent && (
                        <Select options={options} onChange={setOpponentLogo} />
                      )}
                    </label>
                  </div>
                  <div className="match-container">
                    <label>
                      <span>Mecz 4</span>
                      <br />
                      <input
                        type="radio"
                        name="group4"
                        value="gospodarz"
                        onChange={setRadioFour}
                        checked={radioFour == "gospodarz"}
                      />
                      <span>Gospodarz</span>
                      <input
                        type="radio"
                        name="group4"
                        value="gospodarz"
                        onChange={setRadioFour}
                        checked={radioFour == "gosc"}
                      />
                      <span>Gość</span>
                      <br />
                      <br />
                      <span>Dzień i miesiąc</span>
                      <input type="text" />
                      <span>Godzina</span>
                      <input type="text" />
                      <span>Przeciwnik</span>
                      {Opponent && (
                        <Select options={options} onChange={setOpponentLogo} />
                      )}
                    </label>
                    <button
                      className="btn primary-btn save"
                      onClick={() => exportImg()}
                    >
                      Zapisz
                    </button>
                  </div>
                </>
              )}
              {posters && posters.type == "TICKET" && (
                <>
                  VV nie działa jeszcze <br></br>
                  <label>liga</label>
                  <input type="text" />
                  <label>Data i godzina</label>
                  <input type="text" />
                  <label>Miejsce</label>
                  <input type="text" />
                  <label>Rodzaj biletu oraz cena</label>
                  <input type="text" />
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "MONTHLY-SUMMARY" && (
                <>
                  <label>Liga</label>
                  <input type="text" onChange={getLeague} />
                  <label>Miesiąc</label>
                  <Select
                    options={[
                      { label: "styczeń", value: "styczeń" },
                      { label: "luty", value: "luty" },
                      { label: "marzec", value: "marzec" },
                      { label: "kwiecień", value: "kwiecień" },
                      { label: "maj", value: "maj" },
                      { label: "czerwiec", value: "czerwiec" },
                      { label: "lipiec", value: "lipiec" },
                      { label: "sierpień", value: "sierpień" },
                      { label: "wrzesień", value: "wrzesień" },
                      { label: "październik", value: "październik" },
                      { label: "listopad", value: "listopad" },
                      { label: "grudzień", value: "grudzień" },
                    ]}
                    onChange={getMonth}
                  />
                  <p style={{ marginTop: "20px" }}>Mecz 1</p>
                  <label>Data</label>
                  <input
                    type="text"
                    value={dateOne}
                    onChange={getDateOne}
                    maxLength="5"
                  />
                  <label>Godzina</label>
                  <input
                    type="text"
                    value={hourOne}
                    onChange={getHourOne}
                    maxLength="5"
                  />
                  <label>Przeciwnik</label>
                  {Opponent && (
                    <Select options={options} onChange={getOpponentOne} />
                  )}
                  <label>Wynik</label>
                  <br />
                  <input
                    type="number"
                    value={yourResultOne}
                    onChange={getYourResultOne}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />{" "}
                  -{" "}
                  <input
                    type="number"
                    value={opponentResultOne}
                    onChange={getOpponentResultOne}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      value="gospodarz"
                      checked={radioOne === "gospodarz"}
                      onChange={(e) => setRadioOne(e.target.value)}
                    />
                    <span>Gospodarz</span>
                  </label>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      value="gosc"
                      checked={radioOne === "gosc"}
                      onChange={(e) => setRadioOne(e.target.value)}
                    />
                    <span>Gość</span>
                  </label>
                  <br />
                  <br />
                  <p>Mecz 2</p>
                  <label>Data</label>
                  <input
                    type="text"
                    value={dateTwo}
                    onChange={getDateTwo}
                    maxLength="5"
                  />
                  <label>Godzina</label>
                  <input
                    type="text"
                    value={hourTwo}
                    onChange={getHourTwo}
                    maxLength="5"
                  />
                  <label>Przeciwnik</label>
                  {Opponent && (
                    <Select options={options} onChange={getOpponentTwo} />
                  )}
                  <label>Wynik</label>
                  <br />
                  <input
                    type="number"
                    value={yourResultTwo}
                    onChange={getYourResultTwo}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />{" "}
                  -{" "}
                  <input
                    type="number"
                    value={opponentResultTwo}
                    onChange={getOpponentResultTwo}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />
                  <label>
                    <input
                      name="group2"
                      type="radio"
                      value="gospodarz"
                      onChange={() => setRadioTwo("gospodarz")}
                      checked={radioTwo === "gospodarz"}
                    />
                    <span>Gospodarz</span>
                  </label>
                  <label>
                    <input
                      name="group2"
                      type="radio"
                      value="gosc"
                      onChange={() => setRadioTwo("gosc")}
                      checked={radioTwo === "gosc"}
                    />
                    <span>Gość</span>
                  </label>
                  <br />
                  <br />
                  <p>Mecz 3</p>
                  <label>Data</label>
                  <input
                    type="text"
                    value={dateThree}
                    onChange={getDateThree}
                    maxLength="5"
                  />
                  <label>Godzina</label>
                  <input
                    type="text"
                    value={hourThree}
                    onChange={getHourThree}
                    maxLength="5"
                  />
                  <label>Przeciwnik</label>
                  {Opponent && (
                    <Select options={options} onChange={getOpponentThree} />
                  )}
                  <label>Wynik</label>
                  <br />
                  <input
                    type="number"
                    value={yourResultThree}
                    onChange={getYourResultThree}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />{" "}
                  -{" "}
                  <input
                    type="number"
                    value={opponentResultThree}
                    onChange={getOpponentResultThree}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />
                  <label>
                    <input
                      name="group3"
                      type="radio"
                      value="gosc"
                      onChange={() => setRadioThree("gospodarz")}
                      checked={radioThree === "gospodarz"}
                    />
                    <span>Gospodarz</span>
                  </label>
                  <label>
                    <input
                      name="group3"
                      type="radio"
                      value="gosc"
                      onChange={() => setRadioThree("gosc")}
                      checked={radioThree === "gosc"}
                    />
                    <span>Gość</span>
                  </label>
                  <br />
                  <br />
                  <p>Mecz 4</p>
                  <label>Data</label>
                  <input
                    type="text"
                    value={dateFour}
                    onChange={getDateFour}
                    maxLength="5"
                  />
                  <label>Godzina</label>
                  <input
                    type="text"
                    value={hourFour}
                    onChange={getHourFour}
                    maxLength="5"
                  />
                  <label>Przeciwnik</label>
                  {Opponent && (
                    <Select options={options} onChange={getOpponentFour} />
                  )}
                  <label>Wynik</label>
                  <br />
                  <input
                    type="number"
                    value={yourResultFour}
                    onChange={getYourResultFour}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />{" "}
                  -{" "}
                  <input
                    type="number"
                    value={opponentResultFour}
                    onChange={getOpponentResultFour}
                    style={{ width: "50px" }}
                    min="0"
                    max="99"
                  />
                  <label>
                    <input
                      name="group4"
                      type="radio"
                      value="gospodarz"
                      onChange={() => setRadioFour("gospodarz")}
                      checked={radioFour === "gospodarz"}
                    />
                    <span>Gospodarz</span>
                  </label>
                  <label>
                    <input
                      name="group4"
                      type="radio"
                      value="gosc"
                      onChange={() => setRadioFour("gosc")}
                      checked={radioFour === "gosc"}
                    />
                    <span>Gość</span>
                  </label>
                  <br />
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "TRAINERS" && (
                <>
                  <label>Trener 1</label>
                  <Select />
                  <label>Trener 2</label>
                  <Select />
                </>
              )}
              {posters && posters.type == "EVENT-ANNOUNCEMENT" && (
                <>
                  <label>Liga</label>
                  <input type="text" value={league} onChange={getLeague} />
                  <label>Data i godzina</label>
                  <input type="text" value={typeDate} onChange={date} />
                  <label>Miejsce</label>
                  <input type="text" value={typePlace} onChange={place} />
                  <label>Przeciwnicy</label>
                  {Opponent && (
                    <Select options={options} onChange={setOpponentLogo} />
                  )}
                  <button
                    className="btn primary-btn save"
                    onClick={() => exportImg()}
                  >
                    Zapisz
                  </button>
                </>
              )}
              {posters && posters.type == "COMPETITOR-PRESENTATION" && (
                <>
                  {Players && (
                    <>
                      <label>Zawodnik</label>
                      <Select options={playerOptions} />
                    </>
                  )}
                </>
              )}
            </div>
            {Licenses && Licenses[0].license == "free-trial" && (
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
