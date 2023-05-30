import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";


const typePlace = (fabricRef, coords, place, themeOption) => {

  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "typePlace") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });

  const font = new FontFaceObserver(coords.typePlace.FontFamily);
  
    font.load().then(() => {
  const typePlace = new fabric.Text(place, {
    selectable: false,
    charSpacing: coords.typePlace.CharSpacing ? coords.typePlace.CharSpacing : 0,
    textAlign: "center",
    top: coords.typePlace.Top,
    left: coords.typePlace.Left,
    className: "typePlace",
    fontSize: coords.typePlace.FontSize,
    fill: coords.typePlace.Fill,
    originX: coords.typePlace.OriginX,
    originY: coords.typePlace.OriginY,
    fontFamily: coords.typePlace.FontFamily,
    fontStyle: coords.typePlace.FontStyle ? coords.typePlace.FontStyle : "normal"
  });
      
  if (typePlace.width >= coords.typePlace.ScaleToWidth) {
    typePlace.scaleToWidth(coords.typePlace.ScaleToWidth);
      }
      
      if (coords.typePlace.themeOption) {
        findThemeOption(coords.typePlace,themeOption, typePlace)
      }
      fabricRef.current.add(typePlace);
      fabricRef.current.renderAll();
});


}

export default typePlace;