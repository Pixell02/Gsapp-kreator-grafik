import yourTeamLogo from "../../img/crest_2.png";
import opponentTeamLogo from "../../img/crest_1.png";
import playerImg from "../../img/playerImg.png";
import image from "../../img/image.jpg";
export const layersName = [
  { name: "herb gospodarza", type: "image", image: yourTeamLogo, className: "yourTeamLogo" },
  { name: "herb przeciwnika", type: "image", image: opponentTeamLogo, className: "opponentImage" },
  {
    name: "zdjęcie zawodnika",
    type: "playerImage",
    image: playerImg,
    className: "playerImage",
  },
  { name: "zdjęcie", type: "FilteredImage", image: image, className: "image" },
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
    className: "yourPlayerOneGoal",
  },
  {
    name: "gole przeciwnika",
    type: "textBox",
    text: "42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n 42' Nazwisko \n ",
    className: "opponentPlayerOneGoal",
  },
  { name: "klasa", type: "text", text: "Klasa", className: "yourLeague" },
  { name: "kolejka", type: "text", text: "kolejka", className: "yourKolejka" },
  { name: "miejsce", type: "text", text: "miejsce", className: "typePlace" },
  { name: "data i godzina", type: "text", text: "data i godzina", className: "typeData" },
  { name: "linia tekstu", type: "universalText", text: "linia tekstu", className: "" },
  { name: "pole tekstowe", type: "universalTextBox", text: "pole tekstowe", className: "" },
  { name: "herby gospodarza", type: "multiplyImage", image: yourTeamLogo, className: "yourTeamLogoOne" },
  { name: "herby gości", type: "multiplyImage", image: opponentTeamLogo, className: "opponentImageOne" },
  { name: "pełne nazwy gospodarza", type: "multiplyText", text: "Twoja drużyna", className: "yourTeamNameOne" },
  { name: "gospodarz - gość", type: "multiplyText", text: "Twoja drużyna - Twój przeciwnik", className: "connectedTeams" },
  { name: "pełne nazwy przeciwników", type: "multiplyText", text: "Twój przeciwnik", className: "yourOpponentNameOne" },
  { name: "wyniki (88:88)", type: "multiplyText", text: "88:88", className: "connectedResultsOne" },
  { name: "wyniki gospodarza", type: "multiplyText", text: "88", className: "yourTeamResultOne" },
  { name: "wyniki gości", type: "multiplyText", text: "88", className: "opponentTeamResultOne" },
  {name: "liczby", type:"multiplyUniversalNumber", text: "8", className: "warstwa"},
  { name: "linie tekstu", type: "multiplyUniversalText", text: "linia tekstu", className:"warstwa"}
];
