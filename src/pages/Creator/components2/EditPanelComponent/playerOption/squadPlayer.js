import findThemeOption from "../functions/themeOption";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

const squadPlayer = (fabricRef, squadPlayers, themeOption, coords, young, goalKeeper, capitan, poster) => {
  if (squadPlayers && coords.playerOne) {
    let text = "";
    squadPlayers.forEach((player) => {
      if (player) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "player") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let formatPlayer;

        if (coords.playerOne.format === "NumDotSurName") {
          formatPlayer = player.split(".")[0] + "." + player.split(".")[2];
        } else if (coords.playerOne.format === "NumSurName") {
          formatPlayer = player.split(".")[0] + " " + player.split(".")[2];
        } else if (coords.playerOne.format === "dotted") {
          formatPlayer = player.split(".")[0] + "." + player.split(".")[1][0] + "." + player.split(".")[2];
        } else if (coords.playerOne.format === "oneDot") {
          formatPlayer = player.split(".")[0] + " " + player.split(".")[1][0] + "." + player.split(".")[2];
        } else {
          formatPlayer = player.split(".")[2];
        }
        if (young) {
          young.forEach((young, i) => {
            if (young === player) {
              formatPlayer += " (m)"
            }
          })
        }
        
        if (goalKeeper) {
          goalKeeper.forEach((goalKeeper, i) => {
            if (goalKeeper === player) {
              if(poster === "3be4e46594d747bebe89a8145edf8edc")
                formatPlayer += " (br)"
              else {
                formatPlayer += " (gk)"
              }
            }
          })
        } if (capitan === player) {
          if (poster !== "3be4e46594d747bebe89a8145edf8edc") {
            formatPlayer += " (c)";
          } else {
            formatPlayer += " (k)";
          }
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
        lineHeight: coords.playerOne.LineHeight,
        textAlign: coords.playerOne.TextAlign,
        originX: coords.playerOne.OriginX,
        width: coords.playerOne.ScaleToWidth * 1.5,
        fontSize: coords.playerOne.FontSize,
        fill: coords.playerOne.Fill,
        className: "player",
        fontFamily: coords.playerOne.FontFamily,
        splitByGrapheme: true,
      });
      if (coords.playerOne.CharSpacing) {
        showPlayer.set({
          charSpacing: coords.playerOne.CharSpacing,
        });
      }
      if (coords.playerOne.themeOption) {
        findThemeOption(coords.playerOne, themeOption, showPlayer)
      }

      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);
        if (width >= coords.playerOne.ScaleToWidth) {
          showPlayer.scaleToWidth(coords.playerOne.ScaleToWidth);
        }
      });

      fabricRef.current.add(showPlayer);

      fabricRef.current.renderAll();
    });
  }
  
};

export default squadPlayer;