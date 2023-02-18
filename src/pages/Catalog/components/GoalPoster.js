import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import { useParams } from "react-router-dom";

export default function GoalPoster({ posterBackGround, yourPlayer,id, coords,themeOption, yourTeamResult, yourOpponentResult }) {
  const [isPoster, setIsPoster] = useState(null);
  const { poster } = useParams();
  const backImg = new Image();
  backImg.src = posterBackGround;
  const fabricRef = useRef();

  useEffect(() => {
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
    };

    initFabric();
  }, [posterBackGround]);
  const yourPlayerFullName = () => {
    if (yourPlayer) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayer") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if(poster === "fbdiShvAmFm1QbivOwMU" || poster === "oRVBJEM5RcjZ0J1dj7C7") {
        const playerSurName = yourPlayer.split(" ")[1]
        yourPlayer = yourPlayer[0] + "." + playerSurName;
      }
      const font = new FontFaceObserver(coords.playerFontFamily);
      font.load().then(() => {
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
        playerName.scaleToWidth(coords.playerScaleToWidth)
      }
      if(poster === "lZP9mhRklsifxKLUvzTd" && themeOption.label.split("-")[0]==="żółto") {
        playerName.set({
          fill:"black"
        })
      } else {
        playerName.set({
          fill:"white"
        });
      }
      if(id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
        playerName.set({
          fill: "black"
        })
      }
      if(id.theme === "motyw 4" && themeOption.label === "zielony") {
        playerName.set({
          fill: "black"
        })
      }
      if(id.theme === "motyw 4" && themeOption.label === "niebieski") {
        playerName.set({
          fill: "black"
        })
      }
      fabricRef.current.add(playerName);
      });
    }
  };
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
          if(result.width > coords.yourTeamResultScaleToWidth) {
            result.scaleToWidth(coords.yourTeamResultScaleToWidth);
          }

          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            result.set({
              fill: "black",
            });
          }
          if(poster === "PmoRESwg91LxFAGFObbZ") {
            result.set({
              fill: "white"
            })
          }
          if(id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
            result.set({
              fill: "white",
            });
          }
          if(id.theme === "motyw 3" && themeOption.label === "biało-niebieski") {
            result.set({
              fill: "white",
            });
          }
          if(id.theme === "motyw 3" && themeOption.label === "biało-czerwono-niebiesko-zielony") {
            result.set({
              fill: "white",
            });
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

        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          result.set({
            fill: "black",
          });
        }
        if(poster === "PmoRESwg91LxFAGFObbZ") {
          result.set({
            fill: "white"
          })
        }
        if(id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
          result.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 3" && themeOption.label === "biało-niebieski") {
          result.set({
            fill: "white",
          });
        }
        if(id.theme === "motyw 3" && themeOption.label === "biało-czerwono-niebiesko-zielony") {
          result.set({
            fill: "white",
          });
        }
        fabricRef.current.add(result);
      
      
    }
  };
  useEffect(() => {
    opponentResult();
  },[yourOpponentResult, posterBackGround])
    
useEffect(() => {
  yourResult();
},[yourTeamResult, posterBackGround])
    
 

  useEffect(() => {
    yourPlayerFullName();
  },[yourPlayer,posterBackGround])
  

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}
