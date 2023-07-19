import yourTeamLogo from "../../img/crest_2.png";
import opponentTeamLogo from "../../img/crest_1.png";
import playerImg from "../../img/playerImg.png";
export const layersName = [
  { name: "herb gospodarza", type: "image", image: yourTeamLogo, className: "yourTeamLogo" },
  { name: "herb przeciwnika", type: "image", image: opponentTeamLogo, className: "opponentImage" },
  {
    name: "zdjęcie zawodnika (do bazy się nie dodaje jeszcze)",
    type: "playerImage",
    image: playerImg,
    className: "playerImage",
  },
  { name: "pierwsza część nazwy gospodarza", type: "text", text: "Twoja", className: "yourTeamFirstName" },
  { name: "druga część nazwy gospodarza", type: "text", text: "Drużyna", className: "yourTeamSecondName" },
  { name: "pełna nazwa gospodarza", type: "text", text: "Twoja Drużyna", className: "yourTeamName" },
  { name: "pierwsza część nazwy przeciwnika", type: "text", text: "Twój", className: "opponentFirstName" },
  { name: "druga część nazwy przeciwnika", type: "text", text: "Przeciwnik", className: "opponentSecondName" },
  { name: "pełna nazwa przeciwnika", type: "text", text: "Twój przeciwnik", className: "opponentName" },
  {
    name: "skład meczowy",
    type: "textBox",
    text: "88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko \n88.I.Nazwisko",
    className: "playerOne",
  },
  {
    name: "rezerwowi",
    type: "textBox",
    text: "88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko ",
    className: "reserveOne",
  },
  { name: "wynik gospodarza", type: "text", text: "2", className: "yourTeamResult" },
  { name: "wynik gościa", type: "text", text: "2", className: "yourOpponentResult" },
  { name: "gol zawodnika", type: "playerGoal", text: "I.Nazwisko", className: "player" },
  {
    name: "gole gospodarza",
    type: "textBox",
    text: "42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n ",
    loops: Array(6).fill(""),
    className: "yourPlayerOneGoal",
  },
  {
    name: "gole przeciwnika",
    type: "textBox",
    text: "42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n ",
    loops: Array(6).fill(""),
    className: "opponentPlayerOneGoal",
  },
  { name: "klasa", type: "text", text: "Klasa", className: "yourLeague" },
  { name: "kolejka", type: "text", text: "kolejka", className: "yourKolejka" },
  { name: "miejsce", type: "text", text: "miejsce", className: "typePlace" },
  { name: "data i godzina", type: "text", text: "data i godzina", className: "typeData" },
  { name: "linia tekstu", type: "universalText", text: "linia tekstu", className: "" },
  { name: "pole tekstowe", type: "universalTextBox", text: "pole tekstowe", className: "" },
];
