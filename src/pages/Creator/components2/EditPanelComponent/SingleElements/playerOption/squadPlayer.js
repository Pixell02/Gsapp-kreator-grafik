import findThemeOption from "../functions/themeOption";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

const squadPlayer = (fabricRef, squadPlayers, coords, themeOption,  goalKeeper, capitan) => {
 
  if (squadPlayers && coords.playerOne) {
    let text = "";
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    squadPlayers.forEach((player) => {
      if (player) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "player") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let formatPlayer;
        if (coords.playerOne.format === "NumDotSurName") {
          formatPlayer = (player.number ? player.number : "") + "." + player.secondName;
        } else if (coords.playerOne.format === "NumSurName") {
          formatPlayer = (player.number ? player.number : "") + " " + player.secondName;
        } else if (coords.playerOne.format === "dotted") {
          formatPlayer = (player.number ? player.number : "") + "." + player.firstName[0] + "." + player.secondName;
        } else if (coords.playerOne.format === "oneDot") {
          formatPlayer = (player.number ? player.number : "") + " " + player.firstName[0] + "." + player.secondName;
        } else {
          formatPlayer = player.secondName;
        }   
        if (currentYear - player.age <= 21) {
          formatPlayer += " (m)"
        }
          if ((goalKeeper?.number || "" ) + " " + goalKeeper?.firstName + " " + goalKeeper?.secondName === (player.number || "") + " " + player.firstName + " " + player.secondName) {
            formatPlayer += " (gk)";
          }
        if ((capitan?.number || "" ) + " " + capitan?.firstName + " " + capitan?.secondName === (player.number || "") + " " + player.firstName + " " + player.secondName) {
          formatPlayer += " (c)";
        } else {
          formatPlayer = formatPlayer;
        }
        if (coords.playerOne.textType === "upper") {
          formatPlayer = formatPlayer.toUpperCase();
        }

        text = text + " " + formatPlayer + "\n";
      }
    });
    const font = new FontFaceObserver(coords.playerOne.FontFamily);
    font.load().then(() => {
      const showPlayer = new fabric.Textbox(text, {
        selectable: false,
        top: coords.playerOne.Top,
        left: coords.playerOne.Left,
        lineHeight: parseFloat(coords.playerOne.LineHeight),
        textAlign: coords.playerOne.TextAlign,
        originX: coords.playerOne.OriginX,
        zIndex:5,
        originY: "top",
        width: coords.playerOne.ScaleToWidth,
        fontSize: coords.playerOne.FontSize,
        fill: coords.playerOne.Fill,
        className: "player",
        fontFamily: coords.playerOne.FontFamily,
        angle: coords.playerOne.Angle ? coords.playerOne.Angle : 0,
        fontStyle: (coords.playerOne.FontStyle || "normal"),
        splitByGrapheme: true,
      });

      if (coords.playerOne.CharSpacing) {
        showPlayer.set({
          charSpacing: coords.playerOne.CharSpacing,
        });
      }
      if (coords.playerOne.themeOption) {
        findThemeOption(coords.playerOne, themeOption, showPlayer);
      }

      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);

        while (width > coords.playerOne.ScaleToWidth - 50) {
          const fontSize = showPlayer.get("fontSize");
          showPlayer.set("fontSize", fontSize - 1);
          const newWidth = showPlayer.getLineWidth(i);
          if (newWidth <= coords.playerOne.ScaleToWidth - 50) {
            fabricRef.current.add(showPlayer);
            fabricRef.current.renderAll();
            break;
          }
        }
      });

      fabricRef.current.add(showPlayer);
      fabricRef.current.renderAll();
    });
  }
};

export default squadPlayer;
