import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import "../../../fonts/Oxanium-Regular.ttf"
import "../../../fonts/Oxanium-Bold.ttf"
import "../../../fonts/Goldman-Regular.ttf"
import "../../../fonts/Goldman-Bold.ttf"
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { FabricJSCanvas } from "fabricjs-react";
import FontFaceObserver from "fontfaceobserver";


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
}) {
  const [isPoster, setIsPoster] = useState(null);
  const { poster } = useParams();
  const backImg = new Image();
  backImg.src = posterBackGround.src;
  const [yourTeamLogo, setYourTeamLogo] = useState(yourLogo);
  const { user } = useAuthContext();
  const canvasRef = useRef();
  const fabricRef = useRef();

  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const showPlayerOne = () => {
    if (playerOne) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    const showPlayer = new fabric.Text(playerOne, {
        selectable: false,
        top: coords.playerOneTop,
        left: coords.playerOneLeft,
        originY: coords.playerOneOriginY,
        originX: coords.playerOneOriginX,
        fontSize: coords.playerOneFontSize,
        width: coords.playerOneWidth,
        fill: coords.playerOneFill,
        className: "playerOne",
        fontFamily: coords.playerOneFontFamily,
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
    fabricRef.current.add(showPlayer);
    }
  };
  const showPlayerTwo = () => {
    if (playerTwo) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "playerTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    const showPlayer = new fabric.Text(playerFour, {
        selectable: false,
        top: coords.playerFourTop,
        left: coords.playerFourLeft,
        originY: coords.playerFourOriginY,
        originX: coords.playerFourOriginX,
        fontSize: coords.playerFourFontSize,
        width: coords.playerFourWidth,
        fill: coords.playerFourFill,
        className: "playerFour",
        fontFamily: coords.playerFourFontFamily,
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    const showPlayer = new fabric.Text(playerFive, {
        selectable: false,
        top: coords.playerFiveTop,
        left: coords.playerFiveLeft,
        originY: coords.playerFiveOriginY,
        originX: coords.playerFiveOriginX,
        fontSize: coords.playerFiveFontSize,
        width: coords.playerFiveWidth,
        fill: coords.playerFiveFill,
        className: "playerFive",
        fontFamily: coords.playerFiveFontFamily,
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
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
    })
    showPlayer.scaleToHeight(coords.playersScaleToHeight);
    fabricRef.current.add(showPlayer);
    }
  };

 
  const showReserveFirst = () => {
    if((reserveOne) || (reserveTwo) || (reserveThree) || (reserveFour) || (reserveFive)) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "reserve") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      })
      if(!reserveOne) {
        reserveOne = " ";
      } else {
        reserveOne += " |"
      }
      if(!reserveTwo) {
        reserveTwo = " ";
      } else {
        reserveTwo += " |"
      }
      if(!reserveThree) {
        reserveThree = " ";
      } else {
        reserveThree += " |"
      }
      if(!reserveFour) {
        reserveFour = " ";
      } else {
        reserveFour += " |"
      }
      if(!reserveFive) {
        reserveFive = " ";
      } else {
        reserveFive += "  "
      }
      if(!reserveSix) {
        reserveSix = " ";
      }
      if(!reserveSeven) {
        reserveSeven = " ";
      }
      const text = `${reserveOne}  ${reserveTwo} ${reserveThree } ${reserveFour}  ${reserveFive}`;
      const showReserve = new fabric.Text(text, {
        selectable: false,
        className: "reserve",
        top: coords.reserveOneTop,
        left: coords.reserveOneLeft,
        originX: coords.reserveOneOriginX,
        originY: coords.reserveOneOriginY,
        fontFamily: coords.reserveOneFontFamily,
        fill: coords.reserveOneFill,
      })
      showReserve.scaleToHeight(20)
      fabricRef.current.add(showReserve)
    }
  }
  showReserveFirst()

  const showReserveSecond = () => {
    if((reserveSix) || (reserveSeven)) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "reserveTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      })
      if(!reserveSix || reserveSix == " ") {
        reserveSix = " ";
      } else {
        reserveSix += " |";
      }
      if(!reserveSeven || reserveSix == " ") {
        reserveSeven = " ";
      } else {
        reserveSeven += "";
      }
      const text = `${reserveSix} ${reserveSeven}`;
      
      const showReserve = new fabric.Text(text, {
        selectable: false,
        className: "reserveTwo",
        top: coords.reserveSixTop,
        left: coords.reserveSixLeft,
        originX: coords.reserveSixOriginX,
        originY: coords.reserveSixOriginY,
        fontFamily: coords.reserveSixFontFamily,
        fill: coords.reserveSixFill,
      })
      showReserve.scaleToHeight(20)
      fabricRef.current.add(showReserve)
    }
  }

  showReserveSecond();


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
      fabricRef.current.add(typeDate);
    }
  };

  const opponentLogo = () => {
    if (opponent) {
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
    }
  };
  const opponentsName = () => {
    if (opponentName) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "opponentsName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const opponentsName = new fabric.Text(opponentName, {
        selectable: false,
        top: coords.opponentNameTop,
        left: coords.opponentNameLeft,
        originY: coords.opponentNameOriginY,
        originX: coords.opponentNameOriginX,
        fontSize: coords.opponentNameFontSize,
        width: coords.opponentNameWidth,
        fill: coords.opponentNameFill,
        className: "opponentsName",
        fontFamily: coords.opponentNameFontFamily,
      });
      opponentsName.scaleToWidth(coords.opponentNameScaleToWidth);
      fabricRef.current.add(opponentsName);
    }
  };

  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.width,
        height: backImg.height,
      });
      const img = new Image();
      img.src = posterBackGround.src;
      img.onload = () => {
        const newImg = new fabric.Image.fromURL(img.src, function (img) {
          fabricRef.current.setBackgroundImage(
            img,
            fabricRef.current.renderAll.bind(fabricRef.current)
          );
        });

        setIsPoster(newImg);
        document.querySelector(".lower-canvas").style.width = img.width + "px";
        document.querySelector(".lower-canvas").style.height =
          img.height + "px";
        document.querySelector(".lower-canvas").width = img.width;
        document.querySelector(".lower-canvas").height = img.height;
        document.querySelector(".upper-canvas").width = img.width;
        document.querySelector(".upper-canvas").height = img.height;
        document.querySelector(".upper-canvas").style.width = img.width + "px";
        document.querySelector(".upper-canvas").style.height =
          img.height + "px";
        document.querySelector(".canvas-container").style.width =
          img.width + "px";
        document.querySelector(".canvas-container").style.height =
          img.height + "px";
      };
      const secondImg = new Image();
      secondImg.src = yourTeamLogo[0].img;
      secondImg.onload = () => {
        fabric.Image.fromURL(secondImg.src, function (img) {
          img.set({
            selectable: false,
            top: coords.yourTeamLogoTop,
            left: coords.yourTeamLogoLeft,
            originX: "center",
            originY: "center",
          });
          img.scaleToHeight(coords.yourTeamLogoScaleToHeight);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
      const thirdImg = new Image();
      thirdImg.src = yourTeamLogo[0].img;
      thirdImg.onload = () => {
        fabric.Image.fromURL(thirdImg.src, function (img) {
          img.set({
            selectable: false,
            originX: "center",
            originY: "center",
            top: coords.yourTeamLogoSecondTop,
            left: coords.yourTeamLogoSecondLeft,
          });
          img.scaleToHeight(coords.yourTeamLogoSecondScaleToHeight);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    };

    initFabric();
  }, []);

  useEffect(() => {
    const teamName = () => {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "yourLogo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      let yourTeamName;
      if (poster == "23b5ff36a490e8f93breae34") {
        yourTeamName = yourTeamLogo[0].firstName;
      } else {
        yourTeamName =
          yourTeamLogo[0].firstName +
          " " +
          yourTeamLogo[0].secondName;
      }
      const font = new FontFaceObserver(coords.yourTeamNameFontFamily);
      font.load().then(() => {
        console.log(yourTeamName)
        const name = new fabric.Text(yourTeamName, {
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

      name.scaleToWidth(coords.yourTeamNameScaleToWidth);
      fabricRef.current.add(name);
      })
      
    };
    
      teamName();
    
  }, [isPoster]);

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
  
  return <canvas id="canvas" ref={fabricRef}></canvas>;
}

export default StartingSquad;
