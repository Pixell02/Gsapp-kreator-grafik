import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import "../../../fonts/Goldman-Bold.ttf";
import "../../../fonts/Goldman-Regular.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FontFaceObserver from "fontfaceobserver";

function MatchPoster({
  posterBackGround,
  selectedPlayer,
  opponent,
  yourLogo,
  date,
  opponentName,
  coords,
  place,
  id,
  yourTeamResult,
  yourOpponentResult,
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

  const yourResult = () => {
    if (yourTeamResult) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "yourTeamResult") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(coords.yourTeamResultFontFamily);
      font.load().then(() => {
        const result = new fabric.Text(yourTeamResult, {
          top: coords.yourTeamResultTop,
          left: coords.yourTeamResultLeft,
          fontFamily: coords.yourTeamResultFontFamily,
          selectable: false,
          fill: coords.yourTeamResultFill,
          className: "yourTeamResult",
          originX: coords.yourTeamResultOriginX,
          originY: coords.yourTeamResultOriginY,
        });
        result.scaleToHeight(coords.yourTeamResultScaleToHeight);
        if (result.width > 30) {
          result.scaleToWidth(coords.yourTeamResultScaleToWidth);
        }
        fabricRef.current.add(result);
      });
    }
  };
  const opponentResult = () => {
    if (yourOpponentResult) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "yourOpponentResult") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const result = new fabric.Text(yourOpponentResult, {
        top: coords.yourOpponentResultTop,
        left: coords.yourOpponentResultLeft,
        fontFamily: coords.yourOpponentResultFontFamily,
        selectable: false,
        fill: coords.yourOpponentResultFill,
        className: "yourOpponentResult",
        originX: coords.yourOpponentResultOriginX,
        originY: coords.yourOpponentResultOriginY,
      });
      result.scaleToHeight(coords.yourOpponentResultScaleToHeight);
      if (result.width > 30) {
        result.scaleToWidth(coords.yourOpponentResultScaleToWidth);
      }
      fabricRef.current.add(result);
    }
  };

  const typePlace = () => {
    if (fabricRef.current && place === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (place) {
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

      if (typePlace.width > coords.typePlaceWidth) {
        typePlace.scaleToWidth(coords.typePlaceScaleToWidth);
      }
      fabricRef.current.add(typePlace);
    }
  };

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
      const typeDate = new fabric.Text(date.toUpperCase(), {
        selectable: false,
        height: coords.typeDataHeight,
        top: coords.typeDataTop,
        left: coords.typeDataLeft,
        width: coords.typeDataWidth,
        className: "typeDate",
        fontSize: coords.typeDataFontSize,
        fill: coords.typeDataFill,
        originX: coords.typeDataOriginX,
        originY: coords.typeDataOriginY,
        fontFamily: coords.typeDataFontFamily,
        charSpacing: coords.typeDataCharSpacing,
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
        if (fabricRef.current.item(i).className === "opponentsFirstName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentsSecondName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (
        poster === "0Gbnsa2c4SCS3SQJLEjR" ||
        poster === "YJu8UNwdZjgQEgWcnftH" ||
       poster === "YfwG3U5L7RLVLndyqjXu"
      ) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentFirstName = opponentName.split(" ")[0];

        const opponentSecondName = opponentName.split(" ")[1];
        const font = new FontFaceObserver(coords.opponentFirstNameFontFamily);
        font.load().then(() => {
          const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
            selectable: false,
            top: coords.opponentFirstNameTop,
            left: coords.opponentFirstNameLeft,
            originY: coords.opponentFirstNameOriginY,
            originX: coords.opponentFirstNameOriginX,
            fontSize: coords.opponentFirstNameFontSize,
            width: coords.opponentFirstNameWidth,
            fill: coords.opponentFirstNameFill,
            className: "opponentsFirstName",
            fontFamily: coords.opponentFirstNameFontFamily,
          });
          firstName.scaleToHeight(coords.opponentFirstNameScaleToHeight);
          if (firstName.width > coords.opponentFirstNameWidth) {
            firstName.scaleToWidth(coords.opponentFirstNameScaleToWidth);
          }
          fabricRef.current.add(firstName);
        });
        const fontTwo = new FontFaceObserver(
          coords.opponentSecondNameFontFamily
        );
        fontTwo.load().then(() => {
          const secondName = new fabric.Text(opponentSecondName.toUpperCase(), {
            selectable: false,
            top: coords.opponentSecondNameTop,
            left: coords.opponentSecondNameLeft,
            originY: coords.opponentSecondNameOriginY,
            originX: coords.opponentSecondNameOriginX,
            fontSize: coords.opponentSecondNameFontSize,
            width: coords.opponentSecondNameWidth,
            fill: coords.opponentSecondNameFill,
            className: "opponentsSecondName",
            fontFamily: coords.opponentSecondNameFontFamily,
          });
          secondName.scaleToHeight(coords.opponentSecondNameScaleToHeight);
          if (secondName.width > coords.opponentsecondNameWidth) {
            secondName.scaleToWidth(coords.opponentSecondNameScaleToWidth);
          }
          fabricRef.current.add(secondName);
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const fontOpponent = new FontFaceObserver(
          coords.opponentNameFontFamily
        );

        fontOpponent.load().then(() => {
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
          if (opponentsName.width > coords.opponentNameScaleToWidth) {
            opponentsName.scaleToHeight(coords.opponentNameScaleToHeight);
          }
          fabricRef.current.add(opponentsName);
        });
      }
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
      if (poster === "23b5ff36a490e8f93breae34") {
        yourTeamName = yourTeamLogo[0].firstName;
      } else if (poster === "PmoRESwg91LxFAGFObbZ") {
        yourTeamName = yourTeamLogo[0].firstName + " " + yourTeamLogo[0].secondName;
      }
       else {
        yourTeamName =
          yourTeamLogo[0].firstName.toUpperCase() +
          " " +
          yourTeamLogo[0].secondName.toUpperCase();
      }
      if (
        poster === "0Gbnsa2c4SCS3SQJLEjR" ||
        poster === "YJu8UNwdZjgQEgWcnftH" ||
        poster === "YfwG3U5L7RLVLndyqjXu"
      ) {
        const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();
        const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
        const font = new FontFaceObserver(coords.yourTeamFirstNameFontFamily);
        font.load().then(() => {
          const firstName = new fabric.Text(firstTeamName, {
            selectable: false,
            originX: coords.yourTeamFirstNameOriginX,
            originY: coords.yourTeamFirstNameOriginY,
            top: coords.yourTeamFirstNameTop,
            left: coords.yourTeamFirstNameLeft,
            width: coords.yourTeamFirstNameWidth,
            fill: coords.yourTeamFirstNameFill,
            fontFamily: coords.yourTeamFirstNameFontFamily,
            className: "yourLogo",
          });
          firstName.scaleToHeight(coords.yourTeamFirstNameScaleToHeight);
          if(firstName.width > coords.yourTeamFirstNameWidth) {
            firstName.scaleToWidth(coords.yourTeamFirstNameScaleToWidth)
          }
          fabricRef.current.add(firstName);
        });
        const secondFont = new FontFaceObserver(
          coords.yourTeamSecondNameFontFamily
        );
        secondFont.load().then(() => {
          const secondName = new fabric.Text(secondTeamName, {
            selectable: false,
            originX: coords.yourTeamSecondNameOriginX,
            originY: coords.yourTeamSecondNameOriginY,
            top: coords.yourTeamSecondNameTop,
            width: coords.yourTeamSecondNameWidth,
            left: coords.yourTeamSecondNameLeft,
            fill: coords.yourTeamSecondNameFill,
            fontFamily: coords.yourTeamSecondNameFontFamily,
            className: "yourLogo",
          });
          secondName.scaleToHeight(coords.yourTeamSecondNameScaleToHeight);
          if(secondName.width > coords.yourTeamSecondNamewidth) {
            secondName.scaleToWidth(coords.yourTeamSecondNameScaleToWidth)
          }
          fabricRef.current.add(secondName);
        });
      } else {
        const font = new FontFaceObserver(coords.yourTeamNameFontFamily);
        font.load().then(() => {
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

          if (fabricRef.current.item(0).className == "yourLogo") {
            fabricRef.current.remove(fabricRef.current.item(0));
          }
          name.scaleToWidth(coords.yourTeamNameScaleToWidth);
          fabricRef.current.add(name);
        });
      }
    };
    setTimeout(() => {
      teamName();
    }, [1]);
  }, [isPoster]);

  opponentLogo();
  opponentsName();
  typeDate();
  typePlace();
  yourResult();
  opponentResult();

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}

export default MatchPoster;
