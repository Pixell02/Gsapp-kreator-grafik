import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import { layersName } from "../../layersName";

export default function createDefaultObjects(fabricRef, globalProperties, setIsMany) {
  const addFilter = (filterName, filters) => {
    switch (filterName) {
      case "brightness":
        return new fabric.Image.filters.Brightness({ ...filters });
      case "contrast":
        return new fabric.Image.filters.Contrast({ ...filters });
      case "saturation":
        return new fabric.Image.filters.Saturation({ ...filters });
      case "blendColor":
        return new fabric.Image.filters.BlendColor({ ...filters });
      case "grayScale":
        return new fabric.Image.filters.Grayscale({ ...filters });
      default:
        return null;
    }
  };
  if (!fabricRef.current) return;
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
          const array = globalProperties[key];
          array.forEach((item) => {
            fabric.Image.fromURL(layer.image, function (img) {
              img.set({
                top: item.Top,
                left: item.Left,
                className: item.className,
                selectable: true,
                angle: item.Angle,
                originX: "center",
                originY: "top",
                type: "image",
              });
              img.scaleToWidth(item.ScaleToWidth);
              fabricRef.current.add(img);
              fabricRef.current.renderAll();
            });
          });
        } else if (layer.type === "textBox") {
          let value;
          if (layer.className === "playerOne") {
            if (globalProperties[key]?.Format === "dotted" || globalProperties[key]?.format === "dotted") {
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
            } else if (globalProperties[key]?.Format === "oneDot" || globalProperties[key]?.format === "oneDot") {
              value =
                "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko";
            } else if (globalProperties[key]?.Format === "SurName" || globalProperties[key]?.format === "SurName") {
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
              width: globalProperties[key]?.ScaleToWidth,
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
        } else if (layer.type === "SponsorBlock") {
          const rectangle = new fabric.Rect({
            top: globalProperties[key].Top,
            left: globalProperties[key].Left,
            fill: globalProperties[key].Fill,
            width: globalProperties[key].Width,
            height: globalProperties[key].Height,
            type: "SponsorBlock",
            className: "SponsorBlock",
          });
          fabricRef.current.add(rectangle);
          fabricRef.current.renderAll();
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
              angle: globalProperties[key]?.Angle || 0,
              fill: globalProperties[key]?.Fill,
              fontFamily: globalProperties[key]?.FontFamily,
              type: "text",
              originY: "center",
              originX: globalProperties[key]?.OriginX,
            });

            text.set({
              scaleX: globalProperties[key]?.ScaleToWidth / text.width,
            });
            fabricRef.current?.add(text);
            fabricRef.current?.renderAll();
          });
        } else if (layer.type === "playerGoal") {
          const array = Array.isArray(globalProperties[key]) ? globalProperties[key] : [globalProperties[key]];
          console.log(array);
          if (!array) return;
          array.forEach((item) => {
            let value;
            if ((item.Format || item.format) === "dotted") {
              value = "I.Nazwisko";
            } else if ((item.Format || item.format) === "NumSurName") {
              value = "Imie Nazwisko";
            } else {
              value = "Nazwisko";
            }
            const text = new fabric.IText(value, {
              top: item.Top,
              left: item.Left,
              angle: item.Angle,
              fontSize: item.FontSize,
              width: item.Width,
              originX: item.OriginX,
              originY: item.OriginY,
              className: item.className,
              fill: item.Fill,
              fontFamily: item.FontFamily,
              format: item.Format,
              type: item.type,
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "multiplyText") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
              const text = new fabric.IText(layer.text, {
                charSpacing: globalProperties[key].CharSpacing || 0,
                top:
                  globalProperties.orientation === "vertically"
                    ? globalProperties[key].Top + globalProperties.Margin * (i - 1)
                    : globalProperties[key].Top,
                left:
                  globalProperties.orientation === "horizontally"
                    ? globalProperties[key].Left + globalProperties.Margin * (i - 1)
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
                    ? globalProperties[key].Top + globalProperties.Margin * (i - 1)
                    : globalProperties[key].Top,
                left:
                  globalProperties.orientation === "horizontally"
                    ? globalProperties[key].Left + globalProperties.Margin * (i - 1)
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
                className: globalProperties.className === "" ? "s" : globalProperties.className,
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
                width: globalProperties.ScaleToWidth || globalProperties.Width,
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
        } else if (layer.type === "additionalTextBox" && key === "AdditionalText") {
          globalProperties?.AdditionalText.forEach((globalProperties) => {
            const font = new FontFaceObserver(globalProperties.FontFamily);
            font.load().then(() => {
              const text = new fabric.Textbox(globalProperties.text, {
                top: globalProperties.Top,
                left: globalProperties.Left,
                fontSize: globalProperties.FontSize,
                className: globalProperties.className,
                width: globalProperties.ScaleToWidth || globalProperties.Width,
                height: globalProperties.ScaleToHeight,
                textAlign: globalProperties.TextAlign,
                fill: globalProperties.Fill,
                fontFamily: globalProperties.FontFamily,
                angle: globalProperties.Angle || null,
                originX: globalProperties.OriginX,
                type: "additionalTextBox",
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            });
          });
        } else if (layer.type === "multiplyUniversalText" && key === "TextOne") {
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
        } else if (layer.type === "multiplyUniversalNumber" && key === "NumberOne") {
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
          if (globalProperties?.Images?.Image) {
            const activeFilters = Object.keys(globalProperties?.Images?.filters).reduce((acc, filterName) => {
              // eslint-disable-next-line no-unsafe-optional-chaining
              const { value, active, blendMode, alpha } = globalProperties?.Images?.filters[filterName];
              if (active) {
                const filter = addFilter(filterName, value, blendMode, alpha);
                if (filter) {
                  acc.push(filter);
                }
              }
              return acc;
            }, []);
            if (activeFilters) {
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
          if (globalProperties?.Images) {
            globalProperties.Images.forEach((item, i) => {
              const activeFilters = Object.keys(item.filters).reduce((acc, filterName) => {
                if (item.filters[filterName]) {
                  const filter = addFilter(filterName, item.filters[filterName]);
                  if (filter) {
                    acc.push(filter);
                  }
                }
                return acc;
              }, []);

              fabric.Image.fromURL(layer.image, function (img) {
                img.set({
                  top: item.Top,
                  left: item.Left,
                  className: layer.className + i,
                  selectable: true,
                  filters: activeFilters,
                  angle: item.Angle,
                  originX: "center",
                  originY: "center",
                  type: "FilteredImage",
                });
                img.scaleToHeight(item.ScaleToHeight);
                img.applyFilters();
                fabricRef.current.add(img);
                fabricRef.current.sendToBack(img);
                fabricRef.current.renderAll();
              });
            });
          }
        }
      }
    }
  });
}
