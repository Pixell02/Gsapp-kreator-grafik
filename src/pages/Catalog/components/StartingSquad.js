import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import "../../../fonts/Oxanium-Regular.ttf";
import "../../../fonts/Oxanium-Bold.ttf";
import "../../../fonts/Goldman-Regular.ttf";
import "../../../fonts/Goldman-Bold.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { FabricJSCanvas } from "fabricjs-react";
import FontFaceObserver from "fontfaceobserver";
import reactSelect from "react-select";

function StartingSquad({
  posterBackGround,
  selectedPlayer,
  opponent,
  yourLogo,
  date,
  opponentName,
  coords,
  place,
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  playerFive,
  playerSix,
  playerSeven,
  playerEight,
  playerNine,
  playerTen,
  playerEleven,
  reserveOne,
  reserveTwo,
  reserveThree,
  reserveFour,
  reserveFive,
  reserveSix,
  reserveSeven,
  goalKeeper,
  capitan,
  themeOption,
  radioChecked,
  yourTeamImage,
  id,
  kolejka,
  league
}) {
  const [isPoster, setIsPoster] = useState(null);
  const { poster } = useParams();
  const backImg = new Image();
  backImg.src = posterBackGround;
  const [yourTeamLogo, setYourTeamLogo] = useState(yourLogo);
  const [yourTeamImg, setYourTeamImg] = useState(yourTeamImage);
  const { user } = useAuthContext();
  const canvasRef = useRef();
  const fabricRef = useRef();

  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);


  const yourLeague = () => {
    if (league) {
      if (fabricRef.current && league === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourLeague") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourLeague") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const font = new FontFaceObserver(coords.yourLeagueFontFamily);
      font.load().then(() => {
        if (poster === "mvzttPwmXvDWCz4vJefn") {
          league = league.toUpperCase();
        }
        const yourLeague = new fabric.Text(league, {
          top: coords.yourLeagueTop,
          left: coords.yourLeagueLeft,
          fontFamily: coords.yourLeagueFontFamily,
          selectable: false,
          fill: coords.yourLeagueFill,
          className: "yourLeague",
          originX: coords.yourLeagueOriginX,
          originY: coords.yourLeagueOriginY,
        });

        if (coords.yourLeagueWidth) {
          yourLeague.set({
            width: coords.yourLeagueWidth,
          });
        }
        if (coords.yourLeagueScaleToHeight) {
          yourLeague.scaleToHeight(coords.yourLeagueScaleToHeight);
        }
        if (coords.yourLeagueFontSize) {
          yourLeague.set({
            fontSize: coords.yourLeagueFontSize,
          });
        }
        if (yourLeague.width > coords.yourLeagueScaleToWidth) {
          yourLeague.scaleToWidth(coords.yourLeagueScaleToWidth);
        }
        fabricRef.current.add(yourLeague);
      });
    }
  };
  useEffect(() => {
    yourLeague();
  },[league, themeOption])
    

  const yourKolejka = () => {
    if (kolejka) {
      if (fabricRef.current && kolejka === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourKolejka") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourKolejka") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(coords.yourKolejkaFontFamily);
      font.load().then(() => {
        
        const yourKolejka = new fabric.Text(kolejka, {
          top: coords.yourKolejkaTop,
          left: coords.yourKolejkaLeft,
          fontFamily: coords.yourKolejkaFontFamily,
          selectable: false,
          fill: coords.yourKolejkaFill,
          className: "yourKolejka",
          originX: coords.yourKolejkaOriginX,
          originY: coords.yourKolejkaOriginY,
        });
        if (coords.yourKolejkaCharSpacing) {
          yourKolejka.set({
            charSpacing: coords.yourKolejkaCharSpacing,
          });
        }

        if (coords.yourKolejkaWidth) {
          yourKolejka.set({
            width: coords.yourKolejkaWidth,
          });
        }
        if (coords.yourKolejkaScaleToHeight) {
          yourKolejka.scaleToHeight(coords.yourKolejkaScaleToHeight);
        }
        if (coords.yourKolejkaFontSize) {
          yourKolejka.set({
            fontSize: coords.yourKolejkaFontSize,
          });
        }
        if (yourKolejka.width > coords.yourKolejkaScaleToWidth) {
          yourKolejka.scaleToWidth(coords.yourKolejkaScaleToWidth);
        }
        fabricRef.current.add(yourKolejka);
      });
    }
  };
  yourKolejka();

  const showPlayerOne = () => {
    if (playerOne) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "playerOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerOne) {
        playerOne += " (gk)";
      } else if (capitan === playerOne) {
        playerOne += " (c)";
      } else {
        playerOne = playerOne;
      }
      const font = new FontFaceObserver(coords.playerOneFontFamily)
      font.load().then(() => {
        const showPlayer = new fabric.Text(playerOne, {
        selectable: false,
        top: coords.playerOneTop,
        originY: coords.playerOneOriginY,
        originX: coords.playerOneOriginX,
        fontSize: coords.playerOneFontSize,
        width: coords.playerOneWidth,
        fill: coords.playerOneFill,
        className: "playerOne",
        fontFamily: coords.playerOneFontFamily,
      });
      
      
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerOneLeft) {
        showPlayer.set({
          left: coords.playerOneLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerOneWidth / 2,
        });
      }

      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }

      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerOneWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    })}
  };
  const showPlayerTwo = () => {
    if (playerTwo) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerTwo) {
        playerTwo += " (gk)";
      } else if (capitan === playerTwo) {
        playerTwo += " (c)";
      } else {
        playerTwo = playerTwo;
      }
      const showPlayer = new fabric.Text(playerTwo, {
        selectable: false,
        top: coords.playerTwoTop,
        left: coords.playerTwoLeft,
        originY: coords.playerTwoOriginY,
        originX: coords.playerTwoOriginX,
        fontSize: coords.playerTwoFontSize,
        width: coords.playerTwoWidth,
        fill: coords.playerTwoFill,
        className: "playerTwo",
        fontFamily: coords.playerTwoFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerTwoLeft) {
        showPlayer.set({
          left: coords.playerTwoLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerTwoWidth / 2,
        });
      }

      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerTwoWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };

  const showPlayerThree = () => {
    if (playerThree) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerThree) {
        playerThree += " (gk)";
      } else if (capitan === playerThree) {
        playerThree += " (c)";
      } else {
        playerThree = playerThree;
      }
      const showPlayer = new fabric.Text(playerThree, {
        selectable: false,
        top: coords.playerThreeTop,
        left: coords.playerThreeLeft,
        originY: coords.playerThreeOriginY,
        originX: coords.playerThreeOriginX,
        fontSize: coords.playerThreeFontSize,
        width: coords.playerThreeWidth,
        fill: coords.playerThreeFill,
        className: "playerThree",
        fontFamily: coords.playerThreeFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerThreeLeft) {
        showPlayer.set({
          left: coords.playerThreeLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerThreeWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerThreeWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerFour = () => {
    if (playerFour) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerFour) {
        playerFour += " (gk)";
      } else if (capitan === playerFour) {
        playerFour += " (c)";
      } else {
        playerFour = playerFour;
      }
      const showPlayer = new fabric.Text(playerFour, {
        selectable: false,
        top: coords.playerFourTop,
        originY: coords.playerFourOriginY,
        originX: coords.playerFourOriginX,
        fontSize: coords.playerFourFontSize,
        width: coords.playerFourWidth,
        fill: coords.playerFourFill,
        className: "playerFour",
        fontFamily: coords.playerFourFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerFourLeft) {
        showPlayer.set({
          left: coords.playerFourLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerFourWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerFourWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerFive = () => {
    if (playerFive) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerFive") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerFive) {
        playerFive += " (gk)";
      } else if (capitan === playerFive) {
        playerFive += " (c)";
      } else {
        playerFive = playerFive;
      }
      const showPlayer = new fabric.Text(playerFive, {
        selectable: false,
        top: coords.playerFiveTop,
        originY: coords.playerFiveOriginY,
        originX: coords.playerFiveOriginX,
        fontSize: coords.playerFiveFontSize,
        width: coords.playerFiveWidth,
        fill: coords.playerFiveFill,
        className: "playerFive",
        fontFamily: coords.playerFiveFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerFiveLeft) {
        showPlayer.set({
          left: coords.playerFiveLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerFiveWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerFiveWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };

  const showPlayerSix = () => {
    if (playerSix) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerSix") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerSix) {
        playerSix += " (gk)";
      } else if (capitan === playerSix) {
        playerSix += " (c)";
      } else {
        playerSix = playerSix;
      }
      const showPlayer = new fabric.Text(playerSix, {
        selectable: false,
        top: coords.playerSixTop,
        left: coords.playerSixLeft,
        originY: coords.playerSixOriginY,
        originX: coords.playerSixOriginX,
        fontSize: coords.playerSixFontSize,
        width: coords.playerSixWidth,
        fill: coords.playerSixFill,
        className: "playerSix",
        fontFamily: coords.playerSixFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerSixLeft) {
        showPlayer.set({
          left: coords.playerSixLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerSixWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerSixWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerSeven = () => {
    if (playerSeven) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerSeven") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerSeven) {
        playerSeven += " (gk)";
      } else if (capitan === playerSeven) {
        playerSeven += " (c)";
      } else {
        playerSeven = playerSeven;
      }
      const showPlayer = new fabric.Text(playerSeven, {
        selectable: false,
        top: coords.playerSevenTop,
        left: coords.playerSevenLeft,
        originY: coords.playerSevenOriginY,
        originX: coords.playerSevenOriginX,
        fontSize: coords.playerSevenFontSize,
        width: coords.playerSevenWidth,
        fill: coords.playerSevenFill,
        className: "playerSeven",
        fontFamily: coords.playerSevenFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
        
      }
      if (coords.playerSevenLeft) {
          showPlayer.set({
            left: coords.playerSevenLeft,
          });
        } else {
          showPlayer.set({
            left: coords.playerSevenWidth / 2,
          });
        }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerSevenWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerEight = () => {
    if (playerEight) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerEight") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerEight) {
        playerEight += " (gk)";
      } else if (capitan === playerEight) {
        playerEight += " (c)";
      } else {
        playerEight = playerEight;
      }
      const showPlayer = new fabric.Text(playerEight, {
        selectable: false,
        top: coords.playerEightTop,
        left: coords.playerEightLeft,
        originY: coords.playerEightOriginY,
        originX: coords.playerEightOriginX,
        fontSize: coords.playerEightFontSize,
        width: coords.playerEightWidth,
        fill: coords.playerEightFill,
        className: "playerEight",
        fontFamily: coords.playerEightFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerEightLeft) {
        showPlayer.set({
          left: coords.playerEightLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerEightWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerEightWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };

  const showPlayerNine = () => {
    if (playerNine) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerNine") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerNine) {
        playerNine += " (gk)";
      } else if (capitan === playerNine) {
        playerNine += " (c)";
      } else {
        playerNine = playerNine;
      }
      const showPlayer = new fabric.Text(playerNine, {
        selectable: false,
        top: coords.playerNineTop,
        left: coords.playerNineLeft,
        originY: coords.playerNineOriginY,
        originX: coords.playerNineOriginX,
        fontSize: coords.playerNineFontSize,
        width: coords.playerNineWidth,
        fill: coords.playerNineFill,
        className: "playerNine",
        fontFamily: coords.playerNineFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }

      if (coords.playerNineLeft) {
        showPlayer.set({
          left: coords.playerNineLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerNineWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerNineWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerTen = () => {
    if (playerTen) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerTen") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerTen) {
        playerTen += " (gk)";
      } else if (capitan === playerTen) {
        playerTen += " (c)";
      } else {
        playerTen = playerTen;
      }
      const showPlayer = new fabric.Text(playerTen, {
        selectable: false,
        top: coords.playerTenTop,
        left: coords.playerTenLeft,
        originY: coords.playerTenOriginY,
        originX: coords.playerTenOriginX,
        fontSize: coords.playerTenFontSize,
        width: coords.playerTenWidth,
        fill: coords.playerTenFill,
        className: "playerTen",
        fontFamily: coords.playerTenFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      }
      if (coords.playerTenLeft) {
        showPlayer.set({
          left: coords.playerTenLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerTenWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerTenWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };

  const showPlayerEleven = () => {
    if (playerEleven) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerEleven") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (goalKeeper === playerEleven) {
        playerEleven += " (gk)";
      } else if (capitan === playerEleven) {
        playerEleven += " (c)";
      } else {
        playerEleven = playerEleven;
      }
      const showPlayer = new fabric.Text(playerEleven, {
        selectable: false,
        top: coords.playerElevenTop,
        left: coords.playerElevenLeft,
        originY: coords.playerElevenOriginY,
        originX: coords.playerElevenOriginX,
        fontSize: coords.playerElevenFontSize,
        width: coords.playerElevenWidth,
        fill: coords.playerElevenFill,
        className: "playerEleven",
        fontFamily: coords.playerElevenFontFamily,
      });
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "czarno-biały") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "zielony") {
          showPlayer.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showPlayer.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showPlayer.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showPlayer.set({fill:"white"})
        } 
      
      }
      if (coords.playerElevenLeft) {
        showPlayer.set({
          left: coords.playerElevenLeft,
        });
      } else {
        showPlayer.set({
          left: coords.playerElevenWidth / 2,
        });
      }
      if (coords.playersScaleToHeight) {
        showPlayer.scaleToHeight(coords.playersScaleToHeight);
      }
      if (coords.playersScaleToWidth) {
        if (showPlayer.width >= coords.playerElevenWidth) {
          showPlayer.scaleToWidth(coords.playersScaleToWidth);
        }
      }
      fabricRef.current.add(showPlayer);
    }
  };

  const showReserveFirst = () => {
    
    if (
      reserveOne ||
      reserveTwo ||
      reserveThree ||
      reserveFour ||
      reserveFive
    ) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "reserve") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      let text;
      if (poster != "6JftCRHQYUItjEz55Rn1") {
        if (!reserveOne) {
          reserveOne = " ";
        } else {
          reserveOne = reserveOne;
        }
        if (!reserveTwo) {
          reserveTwo = " ";
        } else {
          reserveTwo = " | " + reserveTwo;
        }
        if (!reserveThree) {
          reserveThree = " ";
        } else {
          reserveThree = " | " + reserveThree;
        }
        if (!reserveFour) {
          reserveFour = " ";
        } else {
          reserveFour = " | " + reserveFour;
        }
        if (!reserveFive) {
          reserveFive = " ";
        } else {
          reserveFive = " | " + reserveFive;
        }
        if (!reserveSix) {
          reserveSix = " ";
        } else {
          if(poster === "IxOg6DyMuo9gTvv8BJK9"){
            reserveSix = " | " + reserveSix;
          } else {
            reserveSix = reserveSix;
          }
        }
        if (!reserveSeven) {
          reserveSeven = " ";
        } else {
          reserveSeven = " | " + reserveSeven;
        }
       
        if(poster === "IxOg6DyMuo9gTvv8BJK9") {
          text = `${reserveOne}  ${reserveTwo} ${reserveThree} ${reserveFour}  ${reserveFive} ${reserveSix} ${reserveSeven}`
        } else {
        text = `${reserveOne}  ${reserveTwo} ${reserveThree} ${reserveFour}  ${reserveFive}`;
      }
      } else {
        if (!reserveOne) {
          reserveOne = " ";
        } else {
          reserveOne = reserveOne;
        }
        if (!reserveTwo) {
          reserveTwo = " ";
        } else {
          reserveTwo = ", " + reserveTwo;
        }
        if (!reserveThree) {
          reserveThree = " ";
        } else {
          reserveThree = " | " + reserveThree;
        }
        if (!reserveFour) {
          reserveFour = " ";
        } else {
          reserveFour = " | " + reserveFour;
        }
        text = `${reserveOne}  ${reserveTwo} `;
      }
      const showReserve = new fabric.Text(text, {
        selectable: false,
        className: "reserve",
        top: coords.reserveOneTop,
        left: coords.reserveOneLeft,
        originX: coords.reserveOneOriginX,
        originY: coords.reserveOneOriginY,
        fontFamily: coords.reserveOneFontFamily,
        fontSize: coords.reserveOneFontSize,
        fill: coords.reserveOneFill,
      });
      const font = new FontFaceObserver(coords.reserveOneFontFamily)
      font.load().then(() => {
        showReserve.set({
          fontFamily: coords.reserveOneFontFamily,
        })
      })
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showReserve.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showReserve.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
          showReserve.set({
            fill: "white",
          });
        }
        if (
        id.theme === "motyw 3" &&
        themeOption.label === "biało-czerwono-niebiesko-zielony"
      ) {
        showReserve.set({
          fill: "white",
        });
      }
      if (id.theme === "motyw 3" && themeOption.label === "biało-niebieski") {
        showReserve.set({
          fill: "white",
        });
      }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showReserve.set({fill:"white"})
        }  
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showReserve.set({fill:"white"})
        } 
      
      }
      if(coords.reserveOneScaleToHeight) {
        showReserve.scaleToHeight(coords.reserveOneScaleToHeight);
      }
      
      if(coords.reserveOneFontSize) {
        showReserve.set({
          fontSize: coords.reserveOneFontSize
        })
      }
      
      
      if (coords.reserveOneScaleToWidth) {
        if (showReserve.width >= coords.reserveOneScaleToWidth) {
          showReserve.scaleToWidth(coords.reserveOneScaleToWidth);
        }
      }
      
      fabricRef.current.add(showReserve);
    }
  };
  showReserveFirst();

  const showReserveSecond = () => {
    if (reserveSix || reserveSeven) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "reserveTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      let text;
      if (poster !== "6JftCRHQYUItjEz55Rn1") {
        if (!reserveSix || reserveSix === " ") {
          reserveSix = " ";
        } else {
          reserveSix = reserveSix;
        }
        if (!reserveSeven || reserveSix === " ") {
          reserveSeven = " ";
        } else {
          reserveSeven = " " + reserveSeven;
        }
        text = `${reserveSix} ${reserveSeven}`;
      } else {
        if (!reserveSix || reserveSix === " ") {
          reserveSix = " ";
        } else {
          reserveSix += ",";
        }
        if (!reserveSeven || reserveSix === " ") {
          reserveSeven = " ";
        } else {
          reserveSeven += "";
        }
      }
      if(poster !== "IxOg6DyMuo9gTvv8BJK9"){
          text = `${reserveSix} ${reserveSeven}`;
        } else {
          text = "";
        }
      const showReserve = new fabric.Text(text, {
        selectable: false,
        className: "reserveTwo",
        top: coords.reserveSixTop,
        left: coords.reserveSixLeft,
        originX: coords.reserveSixOriginX,
        originY: coords.reserveSixOriginY,
        
        fontFamily: coords.reserveSixFontFamily,
        fill: coords.reserveSixFill,
      });
      const font = new FontFaceObserver(coords.playerOneFontFamily)
      font.load().then(() => {
        showReserve.set({
          fontFamily: coords.reserveSixFontFamily,
          top: coords.reserveSixTop,
          fontSize: coords.reserveSixFontSize,
          left: coords.reserveSixLeft,
        })
      })
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          showReserve.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          showReserve.set({
            fill: "white",
          });
        }
        if (
          id.theme === "motyw 3" &&
          themeOption.label === "biało-czerwono-niebiesko-zielony"
        ) {
          showReserve.set({
            fill: "white",
          });
        }

        if (id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
          showReserve.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3" && themeOption.label === "biało-niebieski") {
          showReserve.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 5" && themeOption.label === "biało-niebieski") {
          showReserve.set({fill:"white"})
        } 
        if(id.theme === "motyw 5" && themeOption.label === "żółto-czarny") {
          showReserve.set({fill:"white"})
        } 
      }
      showReserve.scaleToHeight(20);
      if (coords.reserveSixScaleToHeight) {
        showReserve.scaleToHeight(coords.reserveSixScaleToHeight);
      }
      if (coords.reserveSixScaleToWidth) {
        if (showReserve.width >= coords.reserveSixScaleToWidth) {
          showReserve.scaleToWidth(coords.reserveSixScaleToWidth);
        }
      }
      fabricRef.current.add(showReserve);
    }
  };

  showReserveSecond();
  const typePlace = () => {
    if (place) {
    if (fabricRef.current && place === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const typePlace = new fabric.Text(place, {
        selectable: false,
        charSpacing: coords.typePlaceCharSpacing,
        height: coords.typePlaceHeight,
        textAlign: "center",
        top: coords.typePlaceTop,
        left: coords.typePlaceLeft,
        width: coords.typePlaceWidth,
        className: "typePlace",
        fontSize: coords.typePlaceFontSize,
        fill: coords.typePlaceFill,
        originX: coords.typePlaceOriginX,
        originY: coords.typePlaceOriginY,
        fontFamily: coords.typePlaceFontFamily,
      });
      if (coords.typePlaceScaleToHeight) {
        typePlace.scaleToHeight(coords.typePlaceScaleToHeight);
      }

      if (typePlace.width >= coords.typePlaceScaleToWidth) {
        typePlace.scaleToWidth(coords.typePlaceScaleToWidth);
      }
     
      fabricRef.current.add(typePlace);
    }
  };
  typePlace();

  const typeDate = () => {
    if (fabricRef.current && date === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (date) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if(poster === "IxOg6DyMuo9gTvv8BJK9") {
        date = date.toUpperCase();
      }
      const typeDate = new fabric.Text(date, {
        selectable: false,
        height: coords.typeDataHeight,
        textAlign: "center",
        top: coords.typeDataTop,
        left: coords.typeDataLeft,
        width: coords.typeDataWidth,
        className: "typeDate",
        fontSize: coords.typeDataFontSize,
        fill: coords.typeDataFill,
        originX: coords.typeDataOriginX,
        originY: coords.typeDataOriginY,
        fontFamily: coords.typeDataFontFamily,
      });
      if (typeDate.width > coords.typeDataWidth) {
        typeDate.scaleToWidth(coords.typeDataScaleToWidth);
      }
      if(coords.typeDataCharSpacing) {
        typeDate.charSpacing = coords.typeDataCharSpacing
      }
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          typeDate.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "zielony") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
          typeDate.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "biało-niebieski") {
          typeDate.set({
            fill: "white",
          });
        }
      }
      fabricRef.current.add(typeDate);
    }
  };

  const opponentLogo = () => {
    if (opponent) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentImage") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentImg = new Image();
        opponentImg.src = opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.opponentImageTop,
              left: coords.opponentImageLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });

            img.scaleToHeight(coords.opponentImageScaleToHeight);

            fabricRef.current.add(img);
          });
        };
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "opponentImage") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentImg = new Image();
        opponentImg.src = opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.yourTeamLogoTop,
              left: coords.yourTeamLogoLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });

            img.scaleToHeight(coords.yourTeamLogoScaleToHeight);

            fabricRef.current.add(img);
          });
        };
      }
    }
  };
  const opponentsName = () => {
    if (opponentName) {
      if(coords.opponentNameTop){
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(coords.opponentNameFontFamily)
        font.load().then(() => {
        const opponentsName = new fabric.Text(opponentName.toUpperCase(), {
          selectable: false,
          top: coords.opponentNameTop,
          left: coords.opponentNameLeft,
          originY: coords.opponentNameOriginY,
          originX: coords.opponentNameOriginX,
          fill: coords.opponentNameFill,
          className: "opponentsName",
          fontFamily: coords.opponentNameFontFamily,
        });
        
        if(coords.opponentNameWidth){
          opponentsName.set({
            width: coords.opponentNameWidth
          });
        }
        if (coords.opponentNameScaleToHeight) {
          opponentsName.scaleToHeight(coords.opponentNameScaleToHeight);
        }
        if (coords.opponentNameFontSize) {
          opponentsName.set({
            fontSize: coords.opponentNameFontSize,
          });
        }
        if (opponentsName.width >= coords.opponentNameScaleToWidth) {
          opponentsName.scaleToWidth(coords.opponentNameScaleToWidth);
        }
        if (themeOption) {
          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            opponentsName.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
            opponentsName.set({
              fill: "white",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
            opponentsName.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "zielony") {
            opponentsName.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
            opponentsName.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
            opponentsName.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 4" &&
            themeOption.label === "biało-niebieski"
          ) {
            opponentsName.set({
              fill: "white",
            });
          }

        }
        fabricRef.current.add(opponentsName);
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentsName = new fabric.Text(opponentName.toUpperCase(), {
          selectable: false,
          top: coords.yourTeamNameTop,
          left: coords.yourTeamNameLeft,
          originY: coords.yourTeamNameOriginY,
          originX: coords.yourTeamNameOriginX,
          width: coords.yourTeamNameWidth,
          fill: coords.yourTeamNameFill,
          className: "opponentsName",
          fontFamily: coords.yourTeamNameFontFamily,
        });
        if (coords.yourTeamNameScaleToHeight) {
          opponentsName.scaleToHeight(coords.yourTeamNameScaleToHeight);
        }
        if (coords.yourTeamNameFontSize) {
          opponentsName.set({
            fontSize: coords.yourTeamNameFontSize,
          });
        }
        if (coords.yourTeamNameScaleToWidth) {
          if (opponentsName.width >= coords.yourTeamNameScaleToWidth) {
            opponentsName.scaleToWidth(coords.yourTeamNameScaleToWidth);
          }
        }

        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          opponentsName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          opponentsName.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
          opponentsName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "zielony") {
          opponentsName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
          opponentsName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
          opponentsName.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "biało-niebieski") {
          opponentsName.set({
            fill: "white",
          });
        }
        fabricRef.current.add(opponentsName);
      }
    }
  }
  };

  const initFabric = () => {
    fabricRef.current = new fabric.Canvas("canvas", {
      selection: false,
      width: backImg.width,
      height: backImg.height,
    });
    const img = new Image();

    img.src = posterBackGround;

    img.onload = () => {
      const newImg = new fabric.Image.fromURL(img.src, function (img) {
        fabricRef.current.setBackgroundImage(
          img,
          fabricRef.current.renderAll.bind(fabricRef.current)
        );
      });

      setIsPoster(newImg);
      document.querySelector(".lower-canvas").style.width = img.width + "px";
      document.querySelector(".lower-canvas").style.height = img.height + "px";
      document.querySelector(".lower-canvas").width = img.width;
      document.querySelector(".lower-canvas").height = img.height;
      document.querySelector(".upper-canvas").width = img.width;
      document.querySelector(".upper-canvas").height = img.height;
      document.querySelector(".upper-canvas").style.width = img.width + "px";
      document.querySelector(".upper-canvas").style.height = img.height + "px";
      document.querySelector(".canvas-container").style.width =
        img.width + "px";
      document.querySelector(".canvas-container").style.height =
        img.height + "px";
    };
  };
  useEffect(() => {
    initFabric();
  }, [posterBackGround]);
 
  const teamLogo = () => {
    if (poster === "6JftCRHQYUItjEz55Rn1") {
      radioChecked = "radio1";
    }
    if (yourTeamImg) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = yourTeamImg;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.yourTeamLogoTop,
              left: coords.yourTeamLogoLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(coords.yourTeamLogoScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = yourTeamLogo[0].img;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.opponentImageTop,
              left: coords.opponentImageLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(coords.opponentImageScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      }
    }
  };
  useEffect(() => {
      teamLogo();
  }, [radioChecked, posterBackGround, themeOption, yourTeamImg]);
  
  const teamName = () => {
    if (yourTeamLogo[0].firstName) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let yourTeamName;
        if (poster === "23b5ff36a490e8f93breae34") {
          yourTeamName = yourTeamLogo[0].firstName;
        } else {
          yourTeamName =
            yourTeamLogo[0].firstName + " " + yourTeamLogo[0].secondName;
        }
        const font = new FontFaceObserver(coords.yourTeamNameFontFamily);
        font.load().then(() => {
          const name = new fabric.Text(yourTeamName.toUpperCase(), {
            selectable: false,
            originX: coords.yourTeamNameOriginX,
            originY: coords.yourTeamNameOriginY,
            top: coords.yourTeamNameTop,
            left: coords.yourTeamNameLeft,
            fill: coords.yourTeamNameFill,
            fontFamily: coords.yourTeamNameFontFamily,
            className: "yourLogo",
          });
          if (coords.yourTeamNameCharSpacing) {
            name.charSpacing = coords.yourTeamNameCharSpacing;
          }
          if (coords.yourTeamNameWidth) {
            name.width = coords.yourTeamNameWidth;
          }

          if (coords.yourTeamNameScaleToWidth) {
            name.scaleToWidth(coords.yourTeamNameScaleToWidth);
          }
          if (coords.yourTeamNameFontSize) {
            name.fontSize = coords.yourTeamNameFontSize;
          }
          if (themeOption != null) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              name.set({
                fill: "black",
              });
            }
            if (
              id.theme === "motyw 2" &&
              themeOption.label === "żółto-czarny"
            ) {
              name.set({
                fill: "white",
              });
            }
            if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
              name.set({
                fill: "black",
              });
            }
            if (id.theme === "motyw 4" && themeOption.label === "zielony") {
              name.set({
                fill: "black",
              });
            }
            if (
              id.theme === "motyw 4" &&
              themeOption.label === "czarno-biały"
            ) {
              name.set({
                fill: "black",
              });
            }
            if (
              id.theme === "motyw 4" &&
              themeOption.label === "żółto-czarny"
            ) {
              name.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 4" &&
              themeOption.label === "biało-niebieski"
            ) {
              name.set({
                fill: "white",
              });
            }
          }
          fabricRef.current.add(name);
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let yourTeamName;
        if (poster === "23b5ff36a490e8f93breae34") {
          yourTeamName = yourTeamLogo[0].firstName;
        } else {
          yourTeamName =
            yourTeamLogo[0].firstName + " " + yourTeamLogo[0].secondName;
        }
        const font = new FontFaceObserver(coords.opponentNameFontFamily);
        font.load().then(() => {
          const name = new fabric.Text(yourTeamName.toUpperCase(), {
            selectable: false,
            originX: coords.opponentNameOriginX,
            originY: coords.opponentNameOriginY,
            top: coords.opponentNameTop,
            left: coords.opponentNameLeft,
            fill: coords.opponentNameFill,
            fontFamily: coords.opponentNameFontFamily,
            className: "yourLogo",
          });
          if (coords.opponentNameCharSpacing) {
            name.charSpacing = coords.opponentNameCharSpacing;
          }
          if (coords.opponentNameWidth) {
            name.width = coords.opponentNameWidth;
          }
          if (coords.opponentNameFontSize) {
            name.set({
              fontSize: coords.opponentNameFontSize,
            });
          }
          if (coords.opponentNameScaleToWidth) {
            name.scaleToWidth(coords.opponentNameScaleToWidth);
          }

          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            name.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
            name.set({
              fill: "white",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
            name.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "zielony") {
            name.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
            name.set({
              fill: "black",
            });
          }
          if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
            name.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 4" &&
            themeOption.label === "biało-niebieski"
          ) {
            name.set({
              fill: "white",
            });
          }

          fabricRef.current.add(name);
        });
      }
    }
  };
  useEffect(() => {
    teamName();
  }, [themeOption, radioChecked, posterBackGround]);


    opponentLogo();
 
  
  opponentsName();
  showPlayerOne();
  showPlayerTwo();
  showPlayerThree();
  showPlayerFour();
  showPlayerFive();
  showPlayerSix();
  showPlayerSeven();
  showPlayerOne();
  showPlayerEight();
  showPlayerNine();
  showPlayerTen();
  showPlayerEleven();
  typeDate();

  return <canvas id="canvas" ref={fabricRef} />;
}

export default StartingSquad;
