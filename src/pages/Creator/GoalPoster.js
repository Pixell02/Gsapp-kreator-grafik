// import "../../../fonts/Russo_One.ttf";
// import "../../../fonts/Poppins-BoldItalic.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import useFabricCanvas from "./hooks/useFabricCanvas.js";
import FontFaceObserver from "fontfaceobserver";
import { useParams } from "react-router-dom";

export default function GoalPoster({
  posterBackGround,
  yourPlayer,
  id,
  coords,
  themeOption,
  yourTeamResult,
  yourOpponentResult,
  yourTeamImage,
  yourLogo,
  radioChecked,
  opponent
}) {
  
  const { poster } = useParams();
  // const backImg = new Image();
  const [yourTeamLogo, setYourTeamLogo] = useState(yourLogo);
  const [yourTeamImg, setYourTeamImg] = useState(yourTeamImage);
  // backImg.src = posterBackGround;
  const fabricRef = useRef();
  const {initFabric} = useFabricCanvas(fabricRef, posterBackGround);

  useEffect(() => {
    initFabric();
  }, [posterBackGround]);

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
  opponentLogo();

  const teamLogo = () => {
    if (yourTeamImg && coords.yourTeamLogoTop) {
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
  }, [radioChecked, posterBackGround]);

  const yourPlayerFullName = () => {
    if (yourPlayer) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayer") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (
        poster === "fbdiShvAmFm1QbivOwMU" ||
        poster === "oRVBJEM5RcjZ0J1dj7C7" ||
        poster === "rtZUgjjd4i74jHW0mRPs"
      ) {
        const playerSurName = yourPlayer.split(" ")[1];
        yourPlayer = yourPlayer[0] + "." + playerSurName;
      }
      const font = new FontFaceObserver(coords.playerFontFamily);
      font.load().then(() => {
        if(poster !== "lZP9mhRklsifxKLUvzTd"){
          yourPlayer = yourPlayer.toUpperCase();
        }
        const playerName = new fabric.Text(yourPlayer, {
          left: coords.playerLeft,
          top: coords.playerTop,
          fill: coords.playerFill,
          originX: coords.playerOriginX,
          originY: coords.playerOriginY,
          width: coords.playerWidth,
          className: "yourPlayer",
          selectable: false,
          fontFamily: coords.playerFontFamily,
        });
        playerName.scaleToHeight(coords.playerScaleToHeight);
        if (playerName.width > coords.playerWidth) {
          playerName.scaleToWidth(coords.playerScaleToWidth);
        }
        if (
          poster === "lZP9mhRklsifxKLUvzTd" &&
          themeOption.label.split("-")[0] === "żółto"
        ) {
          playerName.set({
            fill: "black",
          });
        } else {
          playerName.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
          playerName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "zielony") {
          playerName.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
          playerName.set({
            fill: "black",
          });
        }
        fabricRef.current.add(playerName);
      });
    }
  };
  const yourResult = () => {
    if (yourTeamResult) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          coords.yourTeamResultFontFamily
        );
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
          if(result.width > coords.yourOpponentResultWidth) {
            result.scaleToWidth(coords.yourOpponentResultScaleToWidth);
          }
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              poster === "PmoRESwg91LxFAGFObbZ" ||
              themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 5" &&
              (themeOption.label === "żółto-czarny" || themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }

          fabricRef.current.add(result);
        });
      } else if (radioChecked === "radio2") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          coords.yourOpponentResultFontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(yourTeamResult, {
            top: coords.yourOpponentResultTop,
            left: coords.yourOpponentResultLeft,
            fontFamily: coords.yourOpponentResultFontFamily,
            selectable: false,
            fill: coords.yourOpponentResultFill,
            className: "yourTeamResult",
            originX: coords.yourOpponentResultOriginX,
            originY: coords.yourOpponentResultOriginY,
          });
          result.scaleToHeight(coords.yourOpponentResultScaleToHeight);
          if(result.width > coords.yourOpponentResultWidth) {
            result.scaleToWidth(coords.yourOpponentResultScaleToWidth);
          }
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              poster === "PmoRESwg91LxFAGFObbZ" ||
              themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 5" &&
              (themeOption.label === "żółto-czarny" || themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }
          fabricRef.current.add(result);
        });
      }
    }
  };
  const opponentResult = () => {
    if (yourOpponentResult) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          coords.yourOpponentResultFontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(yourOpponentResult, {
            top: coords.yourOpponentResultTop,
            left: coords.yourOpponentResultLeft,
            width: coords.yourOpponentResultWidth,
            fontFamily: coords.yourOpponentResultFontFamily,
            selectable: false,
            fill: coords.yourOpponentResultFill,
            className: "yourOpponentResult",
            originX: coords.yourOpponentResultOriginX,
            originY: coords.yourOpponentResultOriginY,
          });

          result.scaleToHeight(coords.yourOpponentResultScaleToHeight);
          if(result.width > coords.yourOpponentResultWidth) {
            result.scaleToWidth(coords.yourOpponentResultScaleToWidth);
          }
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              poster === "PmoRESwg91LxFAGFObbZ" ||
              themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 5" &&
              (themeOption.label === "żółto-czarny" || themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }

          fabricRef.current.add(result);
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(yourOpponentResult, {
          top: coords.yourTeamResultTop,
          left: coords.yourTeamResultLeft,
          width: coords.yourTeamResultWidth,
          fontFamily: coords.yourTeamResultFontFamily,
          selectable: false,
          fill: coords.yourTeamResultFill,
          className: "yourOpponentResult",
          originX: coords.yourTeamResultOriginX,
          originY: coords.yourTeamResultOriginY,
        });
        result.scaleToHeight(coords.yourTeamResultScaleToHeight);
        if(result.width > coords.yourTeamResultWidth) {
          result.scaleToWidth(coords.yourTeamResultScaleToWidth);
        }
        if (themeOption) {
          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            result.set({
              fill: "black",
            });
          }
          if (
            poster === "PmoRESwg91LxFAGFObbZ" ||
            themeOption.label === "biało-czerwono-niebiesko-zielony"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 3" &&
            themeOption.label === "biało-niebieski"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 3" &&
            themeOption.label === "żółto-czarny"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 5" &&
            (themeOption.label === "żółto-czarny" || themeOption.label === "biało-niebieski")
          ) {
            result.set({
              fill: "white",
            });
          }
        }

        fabricRef.current.add(result);
      }
    }
  };
  useEffect(() => {
    opponentResult();
  }, [yourOpponentResult, posterBackGround, radioChecked]);

  useEffect(() => {
    yourResult();
  }, [yourTeamResult, posterBackGround, radioChecked]);

  useEffect(() => {
    yourPlayerFullName();
  }, [yourPlayer, posterBackGround]);

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}
