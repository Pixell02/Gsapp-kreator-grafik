import { useState, useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { BackgroundContext } from "../../Context/BackgroundContext";
import FontFaceObserver from "fontfaceobserver";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";

const useActiveObjectCoords = (fabricRef) => {
  const [coords, setCoords] = useState({});
  const { background, color } = useContext(BackgroundContext);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  
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
                ScaleToHeight: activeObject.className !== "playerImage" ? parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0)) : undefined,
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
          } else if(value === "NumSurName") {
            activeObject.set("text", "Imie Nazwisko");
            canvas.renderAll();
          } else {
            activeObject.set("text", "Nazwisko");
            canvas.renderAll();
          }
        } else if (className === "playerOne") {
          console.log(value)
          if (value === "dotted") {
            activeObject.set("text", "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko");
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set("text", "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko");
            canvas.renderAll();
          } else if (value === "NumDotSurName") {
            activeObject.set("text", "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko");
            canvas.renderAll();
          } else if (value === "oneDot") {
            activeObject.set("text", "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko");
            canvas.renderAll();
          } else {
            activeObject.set("text", "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko");
            canvas.renderAll();
          }
        }
      }
    }
  }

  const handleInputChange = (e) => {
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
                ...(prevState[coords.className]?.themeOption || []).filter((option) => option.label !== color),
                {
                  // ...prevState[coords.className]?.themeOption[color.name],
                  label: color,
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

  const handleSelectChange = (e, coords) => {
    const { value, name } = e.target;
    
    if (name === "fontFamily") {
      const font = new FontFaceObserver(value);
      font.load().then(() => {
        updateActiveObjectCoords(name, value);
        setCoords({ ...coords, [name]: value });
      });
    } else if (name === "Format") {
      updateFormat(value, coords.className)
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
