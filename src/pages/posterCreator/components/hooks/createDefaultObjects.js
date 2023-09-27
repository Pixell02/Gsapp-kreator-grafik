import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import { layersName } from "../../layersName";

const addFilter = (filterName, value, blendMode, alpha) => {
  switch (filterName) {
    case "brightness":
      return new fabric.Image.filters.Brightness({
        brightness: value / 100 - 0.5,
      });
    case "contrast":
      return new fabric.Image.filters.Contrast({ contrast: value / 100 - 0.5 });
    case "saturation":
      return new fabric.Image.filters.Saturation({
        saturation: value / 100 - 0.5,
      });
    case "blendColor":
      return new fabric.Image.filters.BlendColor({
        color: value,
        mode: blendMode,
        alpha: alpha / 100,
      });
    case "grayScale":
      return new fabric.Image.filters.Grayscale({ grayScale: true });
    default:
      return null;
  }
};

export default function createDefaultObjects(
  fabricRef,
  globalProperties,
  setIsMany
) {
  layersName.forEach((layer, i) => {
    for (const key in globalProperties) {
      if (layer.className === key) {
        if (layer.type === "image") {
          fabric.Image.fromURL(layer.image, function (img) {
            img.set({
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              className: layer.className,
              selectable: true,
              angle: globalProperties[key]?.Angle,
              originX: "center",
              originY: "center",
              type: "image",
            });
            img.scaleToHeight(globalProperties[key]?.ScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "playerImage") {
          fabric.Image.fromURL(layer.image, function (img) {
            img.set({
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              className: layer.className,
              selectable: true,
              angle: globalProperties[key]?.Angle,
              originX: "center",
              originY: "top",
              type: "image",
            });
            img.scaleToWidth(globalProperties[key]?.ScaleToWidth);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "textBox") {
          let value;

          if (layer.className === "playerOne") {
            if (
              globalProperties[key]?.Format === "dotted" ||
              globalProperties[key]?.format === "dotted"
            ) {
              value =
                "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko";
            } else if (
              globalProperties[key]?.Format === "NumSurName" ||
              globalProperties[key]?.format === "NumSurName"
            ) {
              value =
                "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko";
            } else if (
              globalProperties[key]?.Format === "NumDotSurName" ||
              globalProperties[key]?.format === "NumDotSurName"
            ) {
              value =
                "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko";
            } else if (
              globalProperties[key]?.Format === "oneDot" ||
              globalProperties[key]?.format === "oneDot"
            ) {
              value =
                "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko";
            } else if (
              globalProperties[key]?.Format === "SurName" ||
              globalProperties[key]?.format === "SurName"
            ) {
              value =
                "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko";
            }
          } else {
            value = layer.text;
          }
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.Textbox(value, {
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              fontSize: globalProperties[key]?.FontSize,
              className: layer.className,
              width: globalProperties[key]?.ScaleToWidth * 1.2,
              height: globalProperties[key]?.Height,
              textAlign: globalProperties[key]?.TextAlign,
              fill: globalProperties[key]?.Fill,
              fontFamily: globalProperties[key]?.FontFamily,
              Format: globalProperties[key]?.Format,
              angle: globalProperties[key]?.Angle,
              originX: globalProperties[key]?.OriginX,
              originY: globalProperties[key]?.OriginY || "top",
              type: "textBox",
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "text") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.IText(layer.text, {
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              width: globalProperties[key]?.ScaleToWidth,
              charSpacing: globalProperties[key]?.CharSpacing || 0,
              fontSize: globalProperties[key]?.FontSize,
              textAlign: globalProperties[key]?.TextAlign || "center",
              className: layer.className,
              angle: globalProperties[key]?.Angle,
              fill: globalProperties[key]?.Fill,
              fontFamily: globalProperties[key]?.FontFamily,
              type: "text",
              originY: "center",
              originX: globalProperties[key]?.OriginX,
            });

            text.set({
              scaleX: globalProperties[key]?.ScaleToWidth / text.width,
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "playerGoal") {
          let value;
          if (
            (globalProperties[key]?.Format || globalProperties[key]?.format) ===
            "dotted"
          ) {
            value = "I.Nazwisko";
          } else if (
            (globalProperties[key]?.Format || globalProperties[key]?.format) ===
            "NumSurName"
          ) {
            value = "Imie Nazwisko";
          } else {
            value = "Nazwisko";
          }
          const text = new fabric.IText(value, {
            top: globalProperties[key]?.Top,
            left: globalProperties[key]?.Left,
            angle: globalProperties[key]?.Angle,
            fontSize: globalProperties[key]?.FontSize,
            width: globalProperties[key]?.Width,
            originX: globalProperties[key]?.OriginX,
            originY: globalProperties[key]?.OriginY,
            className: "player",
            fill: globalProperties[key]?.Fill,
            fontFamily: globalProperties[key]?.FontFamily,
            format: globalProperties[key]?.Format,
            type: globalProperties[key]?.Type,
          });
          fabricRef.current.add(text);
          fabricRef.current.renderAll();
        } else if (layer.type === "multiplyText") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
              const text = new fabric.IText(layer.text, {
                charSpacing: globalProperties[key].CharSpacing || 0,
                top:
                  globalProperties.orientation === "vertically"
                    ? globalProperties[key].Top +
                      globalProperties.Margin * (i - 1)
                    : globalProperties[key].Top,
                left:
                  globalProperties.orientation === "horizontally"
                    ? globalProperties[key].Left +
                      globalProperties.Margin * (i - 1)
                    : globalProperties[key].Left,
                angle: globalProperties[key]?.Angle,
                fontSize: globalProperties[key].FontSize,
                width: globalProperties[key].Width,
                originX: globalProperties[key].OriginX,
                originY: globalProperties[key].OriginY,
                className: globalProperties[key]?.className || " ",
                fill: globalProperties[key].Fill,
                fontFamily: globalProperties[key].FontFamily,
                index: i,
                id: globalProperties[key].type + i,
                selectable: i !== 1 ? false : true,
                format: globalProperties[key].Format,
                type: layer.type,
              });
              text.set({
                scaleX: globalProperties[key]?.ScaleToWidth / text.width,
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            }
          });
          setIsMany(true);
        } else if (globalProperties[key].type === "multiplyimage") {
          for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
            fabric.Image.fromURL(layer.image, function (img) {
              img.set({
                top:
                  globalProperties.orientation === "vertically"
                    ? globalProperties[key].Top +
                      globalProperties.Margin * (i - 1)
                    : globalProperties[key].Top,
                left:
                  globalProperties.orientation === "horizontally"
                    ? globalProperties[key].Left +
                      globalProperties.Margin * (i - 1)
                    : globalProperties[key].Left,
                className: layer.className,
                selectable: i !== 1 ? false : true,

                angle: globalProperties[key]?.Angle,
                originX: "center",
                originY: "center",
                type: "image",
              });
              img.scaleToHeight(globalProperties[key]?.ScaleToHeight);
              fabricRef.current.add(img);
              fabricRef.current.renderAll();
            });
          }
          setIsMany(true);
        }
      } else {
        if (layer.type === "universalText" && key === "Text") {
          globalProperties?.Text?.forEach((globalProperties) => {
            const font = new FontFaceObserver(globalProperties.FontFamily);
            font.load().then(() => {
              const text = new fabric.IText("linia tekstu", {
                charSpacing: globalProperties.CharSpacing || 0,
                top: globalProperties.Top,
                left: globalProperties.Left,
                angle: globalProperties?.Angle,
                fontSize: globalProperties.FontSize,
                width: globalProperties.width,
                originX: globalProperties.OriginX,
                originY: globalProperties.OriginY,
                className:
                  globalProperties.className === ""
                    ? "s"
                    : globalProperties.className,
                index: i,
                id: globalProperties.type + i,
                fill: globalProperties.Fill,
                fontFamily: globalProperties.FontFamily,
                format: globalProperties.Format,
                type: "universalText",
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            });
          });
        } else if (layer.type === "universalTextBox" && key === "TextBox") {
          globalProperties?.TextBox.forEach((globalProperties) => {
            const font = new FontFaceObserver(globalProperties.FontFamily);
            font.load().then(() => {
              const text = new fabric.Textbox("pole tekstowe", {
                top: globalProperties.Top,
                left: globalProperties.Left,
                fontSize: globalProperties.FontSize,
                className: globalProperties.className,
                width:
                  (globalProperties.ScaleToWidth || globalProperties.Width) *
                  1.2,
                height: globalProperties.ScaleToHeight,
                textAlign: globalProperties.TextAlign,
                index: i,
                id: globalProperties.type + i,
                fill: globalProperties.Fill,
                fontFamily: globalProperties.FontFamily,
                format: globalProperties.format || null,
                angle: globalProperties.Angle || null,
                originX: globalProperties.OriginX,
                originY: globalProperties.OriginY || "top",
                type: "universalTextBox",
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            });
          });
        } else if (
          layer.type === "multiplyUniversalText" &&
          key === "TextOne"
        ) {
          globalProperties?.TextOne.forEach((properties) => {
            const font = new FontFaceObserver(properties.FontFamily);
            font.load().then(() => {
              for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
                const text = new fabric.IText(layer.text, {
                  charSpacing: properties.CharSpacing || 0,
                  top:
                    globalProperties.orientation === "vertically"
                      ? properties.Top + globalProperties.Margin * (i - 1)
                      : properties.Top,
                  left:
                    globalProperties.orientation === "horizontally"
                      ? properties.Left + globalProperties.Margin * (i - 1)
                      : properties.Left,
                  fontSize: properties.FontSize,
                  index: i,
                  className: properties?.className || " ",
                  id: properties.type + i,
                  width: properties.ScaleToWidth * 1.2,
                  textAlign: properties.TextAlign,
                  fill: properties.Fill,
                  fontFamily: properties.FontFamily,
                  angle: properties.Angle || null,
                  originX: properties.OriginX,
                  originY: properties.OriginY,
                  selectable: i !== 1 ? false : true,
                  type: properties.type,
                });
                text.set({
                  scaleX: properties.ScaleToWidth / text.width,
                });
                fabricRef.current.add(text);
                fabricRef.current.renderAll();
              }
            });
          });
          setIsMany(true);
        } else if (
          layer.type === "multiplyUniversalNumber" &&
          key === "NumberOne"
        ) {
          globalProperties?.NumberOne.forEach((properties) => {
            const font = new FontFaceObserver(properties.FontFamily);
            font.load().then(() => {
              for (let i = 1; i < globalProperties.numberOfMatches; i++) {
                const text = new fabric.IText("8", {
                  top:
                    globalProperties.orientation === "vertically"
                      ? properties.Top + globalProperties.Margin * (i - 1)
                      : properties.Top,
                  left:
                    globalProperties.orientation === "horizontally"
                      ? properties.Left + globalProperties.Margin * (i - 1)
                      : properties.Left,
                  fontSize: properties.FontSize,
                  className: properties?.className,
                  index: i,
                  id: properties.type + i,
                  width: (properties.ScaleToWidth || properties.Width) * 1.2,
                  textAlign: properties.TextAlign,
                  fill: properties.Fill,
                  fontFamily: properties.FontFamily,
                  format: properties.format || null,
                  angle: properties.Angle || null,
                  originX: properties.OriginX,
                  originY: properties.OriginY,
                  selectable: i !== 1 ? false : true,
                  type: properties.type,
                });
                text.set({
                  scaleX: properties.ScaleToWidth / text.width,
                });
                fabricRef.current.add(text);
              }
              fabricRef.current.renderAll();
            });
          });
          setIsMany(true);
        } else if (layer.type === "FilteredImage" && key === "Images") {
          const activeFilters = Object.keys(
            globalProperties?.Images?.filters
          ).reduce((acc, filterName) => {
            const { value, active, blendMode, alpha } =
              globalProperties?.Images?.filters[filterName];
            if (active) {
              const filter = addFilter(filterName, value, blendMode, alpha);
              if (filter) {
                acc.push(filter);
              }
            }
            return acc;
          }, []);
          globalProperties.Images.Image.forEach((properties) => {
            fabric.Image.fromURL(layer.image, function (img) {
              img.set({
                top: properties?.Top,
                left: properties?.Left,
                className: layer.className,
                selectable: true,
                filters: activeFilters,
                angle: properties?.Angle,
                originX: "center",
                originY: "center",
                type: "FilteredImage",
              });
              img.scaleToHeight(properties.ScaleToHeight);
              img.applyFilters();
              fabricRef.current.add(img);
              fabricRef.current.sendToBack(img);
              fabricRef.current.renderAll();
            });
          });
        }
      }
    }
  });
}
