import { useState, useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { BackgroundContext } from "../../Context/BackgroundContext";
import FontFaceObserver from "fontfaceobserver";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";

const useActiveObjectCoords = (fabricRef) => {
  const [coords, setCoords] = useState({});
  const { background, color } = useContext(BackgroundContext);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  console.log(fabricRef)
  useEffect(() => {
    
    if ( fabricRef && fabricRef.current?.backgroundImage) {
        const handleObjectModified = () => {
          const canvas = fabricRef.current;
          if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
              const newCoords = {
                Top: parseInt(activeObject.top.toFixed(0)),
                Left: parseInt(activeObject.left.toFixed(0)),
                className: activeObject.className,
                Width: parseInt((activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)),
                Height: parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0)),
                ScaleToWidth: parseInt((activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)),
                ScaleToHeight: parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0)),
                FontSize: activeObject.fontSize
                  ? parseInt(activeObject.fontSize * activeObject.scaleY.toFixed(2))
                  : null,
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
                Format: activeObject.format,
                FontStyle: activeObject.fontStyle,
                LineHeight:
                  activeObject.className === "playerOne" ||
                  activeObject.className === "reserveOne" ||
                  activeObject.className === "yourPlayerOneGoal" ||
                  activeObject.className === "opponentPlayerOneGoal"
                    ? activeObject.lineHeight
                    : undefined,
                Formatter: activeObject.className === "reserveOne" ? activeObject.Formatter : null,
              };

              const filteredCoords = Object.entries(newCoords).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                  acc[key] = value;
                }
                return acc;
              }, {});

              setCoords(filteredCoords);
            } else {
              setCoords({})
            }
          }
        };

        
          fabricRef.current.on("object:modified", handleObjectModified);
          fabricRef.current.on("mouse:down", handleObjectModified);
          document.addEventListener("keydown", handleDeleteKeyPress);
    
          return () => {
            fabricRef.current?.off("object:modified", handleObjectModified);
            fabricRef.current?.off("mouse:down", handleObjectModified);
            document.removeEventListener("keydown", handleDeleteKeyPress);
          };
    }
  }, [fabricRef.current, background, globalProperties, coords]);
  const handleDeleteKeyPress = (event) => {
    if (event.keyCode === 46) {
      // kod klawisza Delete lub Backspace

      const activeObject = fabricRef.current.getActiveObject();
      const key = Object.keys(globalProperties).find((prop) => activeObject.className.includes(prop));

      if (activeObject && key) {
        for (const key in globalProperties) {
          if (globalProperties.hasOwnProperty(key)) {
            if (key === activeObject.className) {
              const objectToRemove = activeObject;
              const { [key]: value, ...rest } = globalProperties;
              setGlobalProperties(rest);
              fabricRef.current.remove(objectToRemove);
              fabricRef.current.renderAll();
              break;
            }
          }
        }
        // Usuń koordynaty obiektu z globalnych właściwości
      }
    }
  };

  const updateActiveObjectCoords = (name, value) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (name !== "width" && name !== "height") {
          activeObject.set(name.charAt(0).toLowerCase() + name.slice(1), value);
          canvas.renderAll();
        } else {
          if (name === "width") {
            activeObject.set("scaleX", Number(value) / activeObject.width);
            canvas.renderAll();
          } else {
            activeObject.set("scaleY", Number(value) / activeObject.width);
            canvas.renderAll();
          }
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const canvas = fabricRef.current;
    const activeObject = canvas.getActiveObject();
    const { name, value } = e.target;
    if (name !== "Fill" && name !== "FontFamily" && name !== "OriginX" && name !== "OriginY") {
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
          ...coords,
          ...(coords.type !== "image" &&
            color && {
              themeOption: [
                ...(prevState[coords.className]?.themeOption || []).filter((option) => option.label !== color.name),
                {
                  // ...prevState[coords.className]?.themeOption[color.name],
                  label: color.name,
                  Fill: coords.Fill,
                },
              ],
            }),
        };

        return {
          ...prevState,
          [coords.className]: updatedCoords,
        };
      });
    }
  }, [coords]);

  const handleSelectChange = (e) => {
    const { value, name } = e.target;
    if (name === "fontFamily") {
      const font = new FontFaceObserver(value);
      font.load().then(() => {
        updateActiveObjectCoords(name, value);
        setCoords({ ...coords, [name]: value });
      });
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
