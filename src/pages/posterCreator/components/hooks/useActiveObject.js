import { useState, useEffect, useRef, useContext } from "react";
import { BackgroundContext } from "../../Context/BackgroundContext";
import FontFaceObserver from "fontfaceobserver";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { useMultiPropertiesContext } from "./useMultiPropertiesContext";

const useActiveObjectCoords = (fabricRef) => {
  const [coords, setCoords] = useState({});
  const { background, color } = useContext(BackgroundContext);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  const { properties, setProperties } = useMultiPropertiesContext();
  useEffect(() => {
    if (fabricRef.current?.backgroundImage) {
      const handleObjectModified = () => {
        const canvas = fabricRef.current;
        if (canvas) {
          const activeObject = canvas.getActiveObject();

          if (activeObject) {
            const newCoords = {
              Top: parseInt(activeObject.top.toFixed(0)),
              Left: parseInt(activeObject.left.toFixed(0)),
              className: activeObject.className,
              Angle: parseInt(activeObject.angle),
              Width: parseInt((activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)),
              Height: parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0)),
              ScaleToWidth: parseInt((activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)),
              ScaleToHeight:
                activeObject.className !== "playerImage"
                  ? parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0))
                  : undefined,
              FontSize: activeObject.fontSize ? parseInt(activeObject.fontSize * activeObject.scaleY.toFixed(2)) : null,
              FontFamily:
                activeObject.className === "opponentPlayerOneGoal"
                  ? globalProperties.yourPlayerOneGoal.fontFamily
                  : activeObject.fontFamily,
              CharSpacing: activeObject.charSpacing ? parseInt(activeObject.charSpacing) : null,
              Fill: activeObject.className !== "image" ? activeObject.fill : null,
              OriginX: activeObject.originX,
              OriginY: activeObject.originY,
              type: activeObject.type,
              TextAlign: activeObject.textAlign ? activeObject.textAlign : activeObject.textAlign,
              format: activeObject.format,
              FontStyle: activeObject.fontStyle,
              Margin: activeObject.margin,
              LineHeight:
                activeObject.className === "playerOne" ||
                activeObject.className === "reserveOne" ||
                activeObject.className === "yourPlayerOneGoal" ||
                activeObject.className === "opponentPlayerOneGoal"
                  ? activeObject.lineHeight
                  : undefined,
              Formatter: activeObject.className === "reserveOne" ? activeObject.Formatter : null,
            };
            let objectProperties = new Object();
            fabricRef.current._objects.forEach((object) => {
              if (object.type === "multiplyimage" || object.type === "multiplyText") {
                if (object.className === activeObject.className) {
                  if (object.index !== 1) {
                    object.set(
                      "top",
                      properties.orientation === "vertically"
                        ? objectProperties?.top + (object.index - 1) * properties.Margin
                        : objectProperties?.top
                    );
                    object.set(
                      "left",
                      properties.orientation === "horizontally"
                        ? objectProperties?.left + (object.index - 1) * properties.Margin
                        : objectProperties?.left
                    );
                    object.set("scaleX", objectProperties.scaleX);
                    object.set("scaleY", objectProperties.scaleY);
                  } else {
                    objectProperties = {
                      top: object.top,
                      left: object.left,
                      scaleX: object.scaleX,
                      scaleY: object.scaleY,
                    };
                  }
                }
              }
              fabricRef.current.renderAll();
            });

            const filteredCoords = Object.entries(newCoords).reduce((acc, [key, value]) => {
              if (value !== undefined && value !== null) {
                acc[key] = value;
              }
              return acc;
            }, {});

            setCoords(filteredCoords);
          } else {
            setCoords({});
          }
        }
      };

      fabricRef.current?.on("object:modified", handleObjectModified);
      fabricRef.current.on("mouse:down", handleObjectModified);
      document.addEventListener("keydown", handleDeleteKeyPress);

      return () => {
        fabricRef.current?.off("object:modified", handleObjectModified);
        fabricRef.current?.off("mouse:down", handleObjectModified);
        document.removeEventListener("keydown", handleDeleteKeyPress);
      };
    }
  }, [fabricRef.current, globalProperties, coords, color]);

  

  const handleDeleteKeyPress = (event) => {
    if (event.keyCode === 46) {
      // Kod klawisza Delete lub Backspace

      const activeObject = fabricRef.current.getActiveObject();
      const key = Object.keys(globalProperties).find((prop) => activeObject.className.includes(prop));

      if (activeObject && key) {
        // Jeśli klucz został znaleziony w globalProperties, usuń obiekt związany z kluczem
        const objectToRemove = activeObject;
        const { [key]: value, ...rest } = globalProperties;
        setGlobalProperties(rest);
        fabricRef.current.remove(objectToRemove);
        fabricRef.current.renderAll();
      } else {
        // Przeszukaj tablicę Text w poszukiwaniu indeksu pasującego obiektu

        if (globalProperties.Text?.length > 0) {
          const newTextProperties = [...globalProperties.Text];
          const indexToRemove = newTextProperties.findIndex((prop) => prop.className === activeObject.className);

          if (indexToRemove !== -1) {
            // Jeśli znaleziono pasujący obiekt, usuń go z tablicy Text i z fabric canvas
            newTextProperties.splice(indexToRemove, 1);
            setGlobalProperties({ ...globalProperties, Text: newTextProperties });
            fabricRef.current.remove(activeObject);
            fabricRef.current.renderAll();
          }
        }
        if (globalProperties.TextBox?.length > 0) {
          const newTextProperties = [...globalProperties.TextBox];
          const indexToRemove = newTextProperties.findIndex((prop) => prop.className === activeObject.className);

          if (indexToRemove !== -1) {
            // Jeśli znaleziono pasujący obiekt, usuń go z tablicy Text i z fabric canvas
            newTextProperties.splice(indexToRemove, 1);
            setGlobalProperties({ ...globalProperties, TextBox: newTextProperties });
            fabricRef.current.remove(activeObject);
            fabricRef.current.renderAll();
          }
        }
      }
    }
  };

  const updateActiveObjectCoords = (name, value) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (name !== "Width" && name !== "Height") {
          activeObject.set(name.charAt(0).toLowerCase() + name.slice(1), value);
          canvas.renderAll();
        } else {
          if (name === "Width") {
            activeObject.set("scaleX", Number(value) / activeObject.width);
            canvas.renderAll();
          } else if (name === "Height") {
            activeObject.set("scaleY", Number(value) / activeObject.width);
            canvas.renderAll();
          } else if (name === "angle") {
            activeObject.set("angle", Number(value));
            canvas.renderAll();
          }
        }
      }
    }
  };

  const updateFormat = (value, className) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (className === "player") {
          if (value === "dotted") {
            activeObject.set("text", "I.Nazwisko");
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set("text", "Imie Nazwisko");
            canvas.renderAll();
          } else {
            activeObject.set("text", "Nazwisko");
            canvas.renderAll();
          }
        } else if (className === "playerOne") {
          if (value === "dotted") {
            activeObject.set(
              "text",
              "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko"
            );
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set(
              "text",
              "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko"
            );
            canvas.renderAll();
          } else if (value === "NumDotSurName") {
            activeObject.set(
              "text",
              "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko"
            );
            canvas.renderAll();
          } else if (value === "oneDot") {
            activeObject.set(
              "text",
              "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko"
            );
            canvas.renderAll();
          } else {
            activeObject.set(
              "text",
              "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko"
            );
            canvas.renderAll();
          }
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "Fill" && name !== "FontFamily" && name !== "OriginX" && name !== "OriginY" && name !== "className") {
      updateActiveObjectCoords(name, Number(value));
    } else {
      updateActiveObjectCoords(name, value.toString());
    }
    setCoords({ ...coords, [name]: value });
  };

  useEffect(() => {
    if (coords && coords.className !== undefined) {
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          ...(coords.type !== "universalText" && coords.type !== "universalTextBox" && coords),
          ...(coords.type === "universalText" && {
            Text: getUniqueTextArray([...(prevState.Text || []), coords]),
          }),
          ...(coords.type === "universalTextBox" && {
            TextBox: getUniqueTextArray([...(prevState.TextBox || []), coords]),
          }),
          ...(coords.type !== "image" &&
            color && {
              themeOption: [
                ...(prevState[coords.className]?.themeOption || []).filter((option) => option.label !== color),
                {
                  label: color,
                  Fill: coords.Fill,
                },
              ],
            }),
        };
        function getUniqueTextArray(array) {
          const uniqueClasses = new Set();
          array.reverse();
          return array.filter((item) => {
            if (
              !uniqueClasses.has(item.className) &&
              fabricRef.current?._objects?.some((obj) => obj.className === item.className)
            ) {
              uniqueClasses.add(item.className);
              return true;
            }
            return false;
          });
        }

        // Filter out duplicate elements based on className

        if (coords.type === "universalText") {
          return {
            ...prevState,
            Text: updatedCoords.Text,
          };
        } else if (coords.type === "universalTextBox") {
          return {
            ...prevState,
            TextBox: updatedCoords.TextBox,
          };
        } else {
          return {
            ...prevState,
            [coords.className]: updatedCoords,
          };
        }
      });
    }
  }, [coords]);

  const handleSelectChange = (e, coords) => {
    const { value, name } = e.target;

    if (name === "fontFamily") {
      const font = new FontFaceObserver(value);
      font.load().then(() => {
        updateActiveObjectCoords(name, value);
        setCoords({ ...coords, [name]: value });
      });
    } else if (name === "Format") {
      updateFormat(value, coords.className);
      setCoords({ ...coords, [name]: value });
    } else {
      updateActiveObjectCoords(name, value);
      setCoords({ ...coords, [name]: value });
    }
  };

  return {
    coords,
    setCoords,
    updateActiveObjectCoords,
    handleInputChange,
    handleSelectChange,
  };
};

export default useActiveObjectCoords;
