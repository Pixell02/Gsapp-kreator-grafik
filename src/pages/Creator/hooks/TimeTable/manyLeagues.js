import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function manyLeagues(fabricRef, props, loops) {
  
  if (props.manyLeaguesValues && props.coords.yourLeagueOne) {
    
    const font = new FontFaceObserver(props.coords.yourLeagueOne.FontFamily);
    if (loops) {
      loops.forEach((loop, i) => {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "league-text") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        font.load().then(() => {
            const dataText = new fabric.Text(props.manyLeaguesValues[i], {
              selectable: false,
              className: "league-text",
              top: props.coords.yourLeagueOne.Top + i * props.coords.yourLeagueOne.Margin,
              left: props.coords.yourLeagueOne.Left,
              fontFamily: props.coords.yourLeagueOne.FontFamily,
              fontSize: props.coords.yourLeagueOne.FontSize,
              fill: props.coords.yourLeagueOne.Fill,
              originX: props.coords.yourLeagueOne.OriginX,
              originY: props.coords.yourLeagueOne.OriginY
            });
          
            if (dataText.width > props.coords.yourLeagueOne.ScaleToWidth) {
              dataText.scaleToWidth(props.coords.yourLeagueOne.ScaleToWidth)
            }
            
            fabricRef.current.add(dataText);
          
        });
      });
    }
  }


}