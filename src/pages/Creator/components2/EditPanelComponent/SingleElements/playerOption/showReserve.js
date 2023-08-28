
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";
const showReserve = (fabricRef, reserve, coords, themeOption) => {
  if (reserve && coords.reserveOne) {
    let text = "";
    const innerText = new fabric.Text("");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    reserve.forEach((reserved) => {
      if (reserved) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "reserve") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        
        if (coords.reserveOne.format === "NumDotSurName") {
          reserve = (reserved.number || "") + "." + reserved.secondName;
        } else if (coords.reserveOne.format === "NumSurName") {
         reserve =(reserved.number || "") + "." +reserved.secondName;
        } else if (coords.reserveOne.format === "dotted") {
          reserve = (reserved.number || "") + "." + reserved.firstName[0] + "." + reserved.secondName; 
        } else if (coords.reserveOne.format === "oneDot") {
          reserve = (reserved.number || "") + "." + reserved.firstName[0] + "." + reserved.secondName;
        } else {
          reserve = reserved.secondName
        }
        if (currentYear - Number(reserved.age) <= 21) {
          reserve += "(m)"
        }
        let formatReserve = reserve;
        innerText.set("text", formatReserve + `${coords.reserveOne.Formatter}`);

          text = text + " " + formatReserve + `${coords.reserveOne.Formatter} `;
        
      }
    });
    if (coords.playerOne?.textType === "upper") {
      text = text.toUpperCase();
    }
    
    const font = new FontFaceObserver(coords.reserveOne.FontFamily)
    font.load().then(() => {
      const reserveText = new fabric.Textbox(text, {
        selectable: false,
        className: "reserve",
        textAlign: coords.reserveOne.TextAlign,
        width: coords.reserveOne.ScaleToWidth * 1.1,
        top: coords.reserveOne.Top,
        left: coords.reserveOne.Left,
        zIndex:5,
        originX: coords.reserveOne.OriginX,
        originY: coords.reserveOne.OriginY,
        fontFamily: coords.reserveOne.FontFamily,
        fontSize: coords.reserveOne.FontSize,
        angle: coords.reserveOne.Angle ? coords.reserveOne.Angle : 0,
        fill: coords.reserveOne.Fill,
        fontStyle: (coords.playerOne.FontStyle || "normal"),
      })
      
      if (reserveText.width > coords.reserveOne.ScaleToWidth) {
        reserveText.scaleToWidth(coords.reserveOne.ScaleToWidth)
      }
      if (coords.reserveOne.ScaleToHeight) {
        if (reserveText.height > coords.reserveOne.ScaleToHeight) {
          
          reserveText.set({
            fontSize: coords.reserveOne.FontSize - 4
          })
          if (reserveText.height > coords.reserveOne.ScaleToHeight) {
            reserveText.set({
              width: coords.reserveOne.ScaleToWidth,
              fontSize: coords.reserveOne.FontSize - 8
            })
          }
        }
      }
     
      
    if (coords.reserveOne.themeOption) {
      findThemeOption(coords.reserveOne, themeOption, reserveText)
    }
      fabricRef.current.add(reserveText);
      fabricRef.current.renderAll();
    })
  }
};

export default showReserve;