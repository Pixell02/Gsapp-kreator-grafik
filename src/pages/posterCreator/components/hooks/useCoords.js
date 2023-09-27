import { useContext, useEffect, useState } from "react";
import { BackgroundContext } from "../../Context/BackgroundContext";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { useMultiPropertiesContext } from "./useMultiPropertiesContext";

const useCoords = (fabricRef) => {
  const [coords, setCoords] = useState({});
  const { globalProperties, setGlobalProperties } = useContext(
    GlobalPropertiesContext
  );

  const { properties } = useMultiPropertiesContext();
  const { color } = useContext(BackgroundContext);
  useEffect(() => {
    if (fabricRef.current?._objects) {
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
              Width: parseInt(
                (activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)
              ),
              Height: parseInt(
                (activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(
                  0
                )
              ),
              ScaleToWidth: parseInt(
                (activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)
              ),
              zIndex: activeObject.zIndex,
              ScaleToHeight:
                activeObject.className !== "playerImage"
                  ? parseInt(
                      (
                        activeObject.height * activeObject.scaleY.toFixed(2)
                      ).toFixed(0)
                    )
                  : undefined,
              FontSize: activeObject.fontSize
                ? parseInt(
                    activeObject.fontSize * activeObject.scaleY.toFixed(2)
                  )
                : null,
              FontFamily:
                activeObject.className === "opponentPlayerOneGoal"
                  ? globalProperties.yourPlayerOneGoal.fontFamily
                  : activeObject.fontFamily,
              CharSpacing: activeObject.charSpacing
                ? parseInt(activeObject.charSpacing)
                : null,
              Fill:
                activeObject.className !== "image" ? activeObject.fill : null,
              OriginX: activeObject.originX,
              OriginY: activeObject.originY,
              type: activeObject.type,
              TextAlign: activeObject.textAlign,
              Format: activeObject.Format,
              FontStyle: activeObject.fontStyle,
              Margin: activeObject.margin,
              LineHeight:
                activeObject.className === "playerOne" ||
                activeObject.className === "reserveOne" ||
                activeObject.className === "yourPlayerOneGoal" ||
                activeObject.className === "opponentPlayerOneGoal"
                  ? activeObject.lineHeight
                  : undefined,
              Formatter:
                activeObject.className === "reserveOne"
                  ? activeObject.Formatter
                  : null,
            };
            const objectProperties = {
              top: null,
              left: null,
              scaleX: null,
              scaleY: null,
            };
            fabricRef.current._objects.forEach((object) => {
              if (
                object.type === "multiplyimage" ||
                object.type === "multiplyText" ||
                object.type === "multiplyUniversalText"
              ) {
                if (object.className === activeObject.className) {
                  if (object.index !== 1) {
                    object.set(
                      "top",
                      properties.orientation === "vertically"
                        ? objectProperties?.top +
                            (object.index - 1) * properties.Margin
                        : objectProperties?.top
                    );
                    object.set(
                      "left",
                      properties.orientation === "horizontally"
                        ? objectProperties?.left +
                            (object.index - 1) * properties.Margin
                        : objectProperties?.left
                    );
                    object.set("scaleX", objectProperties.scaleX);
                    object.set("scaleY", objectProperties.scaleY);
                  } else {
                    objectProperties.top = object.top;
                    objectProperties.left = object.left;
                    objectProperties.scaleX = object.scaleX;
                    objectProperties.scaleY = object.scaleY;
                  }
                }
              }
              fabricRef.current.renderAll();
            });

            const filteredCoords = Object.entries(newCoords).reduce(
              (acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            );

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
  }, [fabricRef, color, properties]);

  useEffect(() => {
    if (
      coords &&
      coords.className !== undefined &&
      coords.className !== "image"
    ) {
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          ...(coords.type !== "universalText" &&
            coords.type !== "universalTextBox" &&
            coords.type !== "multiplyUniversalText" &&
            coords.type !== "multiplyUniversalNumber" &&
            coords),
          ...(coords.type === "multiplyUniversalText" && {
            TextOne: getUniqueTextArray([...(prevState.TextOne || []), coords]),
          }),
          ...(coords.type === "multiplyUniversalNumber" && {
            NumberOne: getUniqueTextArray([
              ...(prevState.NumberOne || []),
              coords,
            ]),
          }),
          ...(coords.type === "universalText" && {
            Text: getUniqueTextArray([...(prevState.Text || []), coords]),
          }),
          ...(coords.type === "universalTextBox" && {
            TextBox: getUniqueTextArray([...(prevState.TextBox || []), coords]),
          }),
          ...(coords.type !== "image" &&
            color && {
              themeOption: [
                ...(prevState[coords.className]?.themeOption || []).filter(
                  (option) => option.label !== color
                ),
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
              fabricRef.current?._objects?.some(
                (obj) => obj.className === item.className
              )
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
        } else if (coords.type === "multiplyUniversalText") {
          return {
            ...prevState,
            TextOne: updatedCoords.TextOne,
          };
        } else if (coords.type === "multiplyUniversalNumber") {
          return {
            ...prevState,
            Number: updatedCoords.NumberOne,
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

  const handleDeleteKeyPress = (event) => {
    if (event.keyCode === 46) {
      // Kod klawisza Delete lub Backspace

      const activeObject = fabricRef.current.getActiveObject();

      const key = Object.keys(globalProperties).find((prop) =>
        activeObject.className.includes(prop)
      );
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
          const indexToRemove = newTextProperties.findIndex(
            (prop) => prop.className === activeObject.className
          );

          if (indexToRemove !== -1) {
            // Jeśli znaleziono pasujący obiekt, usuń go z tablicy Text i z fabric canvas
            newTextProperties.splice(indexToRemove, 1);
            setGlobalProperties({
              ...globalProperties,
              Text: newTextProperties,
            });
            fabricRef.current.remove(activeObject);
            fabricRef.current.renderAll();
          }
        }
        if (globalProperties.TextBox?.length > 0) {
          const newTextProperties = [...globalProperties.TextBox];
          const indexToRemove = newTextProperties.findIndex(
            (prop) => prop.className === activeObject.className
          );

          if (indexToRemove !== -1) {
            // Jeśli znaleziono pasujący obiekt, usuń go z tablicy Text i z fabric canvas
            newTextProperties.splice(indexToRemove, 1);
            setGlobalProperties({
              ...globalProperties,
              TextBox: newTextProperties,
            });
            fabricRef.current.remove(activeObject);
            fabricRef.current.renderAll();
          }
        }
        if (globalProperties.TextOne?.length > 0) {
          const newTextProperties = [...globalProperties.TextOne];
          const indexToRemove = newTextProperties.findIndex(
            (prop) => prop.className === activeObject.className
          );

          if (indexToRemove !== -1) {
            // Jeśli znaleziono pasujący obiekt, usuń go z tablicy Text i z fabric canvas
            newTextProperties.splice(indexToRemove, 1);
            setGlobalProperties({
              ...globalProperties,
              TextOne: newTextProperties,
            });
            fabricRef.current.remove(activeObject);
            fabricRef.current._objects.forEach((object) => {
              if (object.className === activeObject.className) {
                fabricRef.current.remove(object);
              }
            });
            fabricRef.current.renderAll();
          }
        }
        if (activeObject.className === "image") {
          fabricRef.current.remove(activeObject);
          fabricRef.current.renderAll();
        }
      }
    }
  };

  return { coords, setCoords };
};

export default useCoords;
