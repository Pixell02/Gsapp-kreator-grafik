import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function GoalPoster({ posterBackGround, yourPlayer, coords }) {
  const [isPoster, setIsPoster] = useState(null);
  const backImg = new Image();
  backImg.src = posterBackGround.src;
  const fabricRef = useRef();

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
    };

    initFabric();
  }, []);
  const yourPlayerFullName = () => {
    if (yourPlayer) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayer") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
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
      fabricRef.current.add(playerName);
      });
    }
  };
  yourPlayerFullName();

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}
