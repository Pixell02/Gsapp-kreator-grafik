import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const yourResult = (fabricRef, yourTeamResult, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className == "yourTeamResult") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const font = new FontFaceObserver(
    coords.yourTeamResult.FontFamily
  );
  font.load().then(() => {
    const result = new fabric.Text(yourTeamResult, {
      top: radioChecked === "radio1" ? coords.yourTeamResult.Top : coords.yourOpponentResult.Top,
      left: radioChecked === "radio1" ? coords.yourTeamResult.Left : coords.yourOpponentResult.Left,
      fontFamily: coords.yourTeamResult.FontFamily,
      fontSize: coords.yourTeamResult.FontSize,
      fontStyle: coords.yourTeamResult.FontStyle ? coords.yourTeamResult.FontStyle : "normal",
      selectable: false,
      fill: coords.yourTeamResult.Fill,
      className: "yourTeamResult",
      angle: coords.yourTeamResult.Angle ? coords.yourTeamResult.Angle : 0,
      originX: radioChecked === "radio1" ? coords.yourTeamResult.OriginX : coords.yourOpponentResult.OriginX,
      originY: radioChecked === "radio1" ? coords.yourTeamResult.OriginY : coords.yourOpponentResult.OriginY,
    });
    
    if (result.width > coords.yourTeamResult.ScaleToWidth) {
      result.scaleToWidth(coords.yourTeamResult.ScaleToWidth);
    }
    if (coords.yourTeamResult.themeOption) {
      findThemeOption(coords.yourTeamResult, themeOption, result)
    }

    fabricRef.current.add(result);
    fabricRef.current.renderAll();
  });
}

export default yourResult;