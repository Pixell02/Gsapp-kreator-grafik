import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../../../../SingleElements/functions/themeOption";

const useAddMultiplyImageAndText = (fabricRef, selectedMatch, properties) => {
  const handleAddImage = (coords, image) => {
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === coords.className + selectedMatch) {
        fabricRef.current.remove(fabricRef.current.item(i));
        fabricRef.current.renderAll();
      }
    });
    const img = new Image();
    img.src = image;

    img.onload = () => {
      fabric.Image.fromURL(img.src, function (img) {
        img.set({
          selectable: false,
          top: properties.orientation === "vertically" ? coords.Top + (selectedMatch - 1) * properties.Margin : coords.Top,
          left: properties.orientation === "horizontally" ? coords.Left + (selectedMatch - 1) * properties.Margin : coords.Left,
          originX: "center",
          originY: "center",
          className: coords.className + selectedMatch,
        });
        img.scaleToHeight(coords.ScaleToHeight);
        if (coords.ScaleToWidth) {
          if (img.width * img.scaleX > coords.ScaleToWidth) {
            img.scaleToWidth(coords.ScaleToWidth);
          }
        }
        fabricRef.current.add(img);
        fabricRef.current.renderAll();
      });
    };
  };
  const handleAddText = (coords, teamName) => {
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === coords?.className + selectedMatch) {
        fabricRef.current.remove(fabricRef.current.item(i));
        fabricRef.current.renderAll();
      }
    });
    const font = new FontFaceObserver(coords.FontFamily);
    font.load().then(() => {
      const text = new fabric.Textbox(teamName, {
        charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
        fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
        originX: coords.OriginX,
        textAlign: coords.OriginX,
        originY: coords.OriginY,
        width: coords.ScaleToWidth,

        top: properties.orientation === "vertically" ? coords.Top + (selectedMatch - 1) * properties.Margin : coords.Top,
        left: properties.orientation === "horizontally" ? coords.Left + (selectedMatch - 1) * properties.Margin : coords.Left,
        fill: coords.Fill,
        fontSize: coords.FontSize,
        fontFamily: coords.FontFamily,
        angle: coords.Angle || 0,
        className: coords?.className + selectedMatch,
      });
      if (text.width > coords.ScaleToWidth - 10) {
        if (!(text.className === `yourTeamNameOne${selectedMatch}` || text.className === `yourOpponentNameOne${selectedMatch}`)) {
          text.scaleToWidth(coords.ScaleToWidth);
        }
        if (text.className === `yourTeamNameOne${selectedMatch}` || text.className === `yourOpponentNameOne${selectedMatch}`) {
          let newFontSize = coords.FontSize;
          while (text._textLines.length > 1) {
            newFontSize = newFontSize - 0.1;
            text.set("fontSize", newFontSize);
            fabricRef.current.renderAll();
          }

          fabricRef.current.getObjects().forEach((obj) => {
            if (obj.className === `yourOpponentNameOne${selectedMatch}` || obj.className === `yourTeamNameOne${selectedMatch}`) {
              if (text.fontSize <= obj.fontSize) {
                obj.set("fontSize", text.fontSize);
              } else {
                text.set("fontSize", obj.fontSize);
              }

              fabricRef.current.renderAll();
            }
          });
        }
      }

      if (coords.themeOption) {
        findThemeOption(coords, coords.themeOption, text);
      }
      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    });
  };

  return { handleAddImage, handleAddText };
};

export default useAddMultiplyImageAndText;
