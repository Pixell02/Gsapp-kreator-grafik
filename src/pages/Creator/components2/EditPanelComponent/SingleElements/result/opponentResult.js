import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const opponentResult = (fabricRef, yourOpponentResult, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourOpponentResult") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const font = new FontFaceObserver(
    coords.yourOpponentResult.FontFamily
  );
  font.load().then(() => {
    const result = new fabric.Text(yourOpponentResult, {
      top: radioChecked === "radio1" ? coords.yourOpponentResult.Top : coords.yourTeamResult.Top,
      left: radioChecked === "radio1" ? coords.yourOpponentResult.Left : coords.yourTeamResult.Left,
      fontFamily: coords.yourOpponentResult.FontFamily,
      selectable: false,
      fill: coords.yourOpponentResult.Fill,
      zIndex:5,
      fontSize: coords.yourTeamResult.FontSize,
      className: "yourOpponentResult",
      angle: radioChecked === "radio1" ? (coords.yourOpponentResult.Angle || 0) : (coords.yourTeamResult.Angle || 0),
      originX: radioChecked === "radio1" ? coords.yourOpponentResult.OriginX : coords.yourTeamResult.OriginX,
      originY: radioChecked === "radio1" ? coords.yourOpponentResult.OriginY : coords.yourTeamResult.OriginY,
    });

    if (result.width >= coords.yourOpponentResult.ScaleToWidth) {
      result.scaleToWidth(coords.yourOpponentResult.ScaleToWidth);
    }
    
    if (coords.yourOpponentResult.themeOption) {
      findThemeOption(coords.yourOpponentResult, themeOption, result);
    }

    fabricRef.current.add(result);
    fabricRef.current.renderAll();
  })
}

export default opponentResult;