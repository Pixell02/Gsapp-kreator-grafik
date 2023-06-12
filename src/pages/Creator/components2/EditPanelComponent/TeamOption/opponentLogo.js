import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const opponentLogo = (fabricRef, opponentLogo, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "opponentImage") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const opponentImg = new Image();
  opponentImg.src = opponentLogo;
  opponentImg.onload = () => {
    fabric.Image.fromURL(opponentImg.src, function (img) {
      img.set({
        selectable: false,
        top: radioChecked === "radio1" ? parseInt(coords.opponentImage.Top) : parseInt(coords.yourTeamLogo.Top),
        left: radioChecked === "radio1" ? parseInt(coords.opponentImage.Left) : parseInt(coords.yourTeamLogo.Left),
        className: "opponentImage",
        originX: "center",
        originY: "center",
      });

      img.scaleToHeight(parseInt(coords.opponentImage.ScaleToHeight));

      if (img.width * img.ScaleX > coords.opponentImage.ScaleToWidth) {
        img.scaleToWidth(coords.opponentImage.ScaleToWidth);
      }
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    });
  };
};

export default opponentLogo;
