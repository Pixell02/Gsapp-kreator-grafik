
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";
const showReserve = (fabricRef, reserve, coords, themeOption, young, goalKeeper, capitan, poster) => {
  if (reserve && coords.reserveOne) {
    let text = "";
    const innerText = new fabric.Text("");
    
    reserve.forEach((reserve) => {
      if (reserve) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "reserve") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        if (young) {
          young.forEach((young, i) => {
            if (young === reserve) {
              reserve += " (m)"
            }
          })
        }
        if (goalKeeper) {
          goalKeeper.forEach((goalKeeper, i) => {
            if (goalKeeper === reserve) {
              reserve += " (br)"
            }
          })
        }
         if (capitan === reserve) {
          if (poster !== "3be4e46594d747bebe89a8145edf8edc"){
          reserve += "(c)";
          } else {
            reserve += "(k)";
          }
        }
        if (coords.playerOne.format === "NumDotSurName") {
          reserve = reserve.split(".")[0] + "." + reserve.split(".")[2];
        } else if (coords.playerOne.format === "NumSurName") {
         reserve =reserve.split(".")[0] + " " +reserve.split(".")[2];
        } else if (coords.playerOne.format === "dotted") {
          reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2]; 
        } else if (coords.playerOne.format === "oneDot") {
          reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2];
        } else {
          reserve = reserve.split(".")[2]
        }
       
        let formatReserve = reserve;
        innerText.set("text", formatReserve + `${coords.reserveOne.Formatter}`);

          text = text + " " + formatReserve + ` ${coords.reserveOne.Formatter}`;
        
      }
    });
    if (coords.playerOne.textType === "upper") {
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
        originX: coords.reserveOne.OriginX,
        originY: coords.reserveOne.OriginY,
        fontFamily: coords.reserveOne.FontFamily,
        fontSize: coords.reserveOne.FontSize,
        fill: coords.reserveOne.Fill,
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