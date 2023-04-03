import { useState, useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { BackgroundContext } from "../../Context/BackgroundContext";
import FontFaceObserver from "fontfaceobserver";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { typeData, yourKolejka } from "../objectProperties";

const useActiveObjectCoords = (fabricRef) => {
  const [coords, setCoords] = useState({});
  const canvasRef = useRef(null);
  const { background } = useContext(BackgroundContext);
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  useEffect(() => {
    if (background) {
      if (fabricRef && fabricRef.current) {
        canvasRef.current = fabricRef.current;
        const handleObjectModified = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const activeObject = canvas.getActiveObject();

            if (activeObject) {
              const newCoords = {
                top: activeObject.top.toFixed(0),
                left: activeObject.left.toFixed(0),
                className: activeObject.className,
                width: (activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0),
                height: (activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0),
                fontSize: activeObject.fontSize,
                fontFamily: activeObject.className === "opponentPlayerOneGoal" ? globalProperties.yourPlayerOneGoal.fontFamily : activeObject.fontFamily,
                charSpacing: activeObject.charSpacing,
                fill: activeObject.fill,
                originX: activeObject.originX,
                originY: activeObject.originY,
                type: activeObject.type,
                textAlign: activeObject.textAlign,
                Margin: activeObject.className === "opponentPlayerOneGoal"?globalProperties.yourPlayerOneGoal.Margin:activeObject.Margin,
                format: activeObject.format,
                fontStyle: activeObject.fontStyle
              };

              const filteredCoords = Object.entries(newCoords).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                  acc[key] = value;
                }

                return acc;
              }, {});

              setCoords(filteredCoords);
              
            }
          }
        };

        canvasRef.current.on("object:modified", handleObjectModified);
        canvasRef.current.on("mouse:down", handleObjectModified);
        document.addEventListener('keydown', handleDeleteKeyPress);

        return () => {
          canvasRef.current.off("object:modified", handleObjectModified);
          canvasRef.current.off("mouse:down", handleObjectModified);
          document.removeEventListener('keydown', handleDeleteKeyPress);
        };
      }
    }
  }, [fabricRef, background, globalProperties]);
  const handleDeleteKeyPress = (event) => {
    
    if (event.keyCode === 46 || event.keyCode === 8) {
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
  }

  const updateActiveObjectCoords = (name, value) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set(name, value);
        canvas.renderAll();
      }
    }
  };

  const updateActiveGroupObjectCoords = (e) => {
    const { name, value } = e.target;
    const canvas = canvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();

      if (activeObject) {
        if (name !== "fill" && name !== "fontFamily" && name !== "originX" && name !== "originY") {
          if (name !== "Margin") {
            activeObject.set(name, parseInt(value));
            const objects = activeObject._objects;
            if (name === "fontSize") {
              objects.forEach((obj) => {
                obj.set(name, parseInt(value));
              });
            }
            canvas.renderAll();
          } else {
            activeObject.set(name, value);
            const objects = activeObject._objects;
            const oldHeight = activeObject.height;
            objects.forEach((obj, i) => {
              obj.set({
                top: i === 0 ? obj.top : objects[0].top + i * parseInt(value),
              });
            });
            activeObject.set({ height: objects[objects.length-1].top + 11 * parseInt(value) });
            const newHeight = activeObject.height - oldHeight;
            objects.forEach((obj, i) => {
              obj.set({
                top: obj.top - newHeight / 2,
              });
            });

            canvas.renderAll();
          }
        } else {
          activeObject.set(name, value);
          const objects = activeObject._objects;
          objects.forEach((obj) => {
            obj.set(name, value.toString());
          });
          canvas.renderAll();
        }
        
        setCoords({ ...coords, [name]: value });
      }
    }
  };
  const handleSelectGroupChange = (e) => {
    const { value, name } = e.target;

    const font = new FontFaceObserver(value);
    font.load().then(() => {
      updateActiveGroupObjectCoords(e);
    });
    setCoords({ ...coords, [name]: value });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "fill" && name !== "fontFamily" && name !== "originX" && name !== "originY") {
      updateActiveObjectCoords(name, parseInt(value));
    } else {
      updateActiveObjectCoords(name, value.toString());
    }
    setCoords({ ...coords, [name]: value });
  };
  console.log(globalProperties);

  useEffect(() => {
    if (coords && coords.className !== undefined) {
      // setGlobalProperties((prevState) => ({
      //   ...prevState,
      //   [coords.className]: {
      //     ...prevState[coords.className],
      //     ...coords,
      //   },
      // }));
      if (coords.className === "typeData") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          typeData: {
            ...prevState.typeData,
            CharSpacing: parseInt(coords.charSpacing),
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            FontStyle: coords.fontStyle,
            Fill: coords.fill,
            ScaleToWidth: parseInt(coords.width),
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourKolejka") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourKolejka: {
            ...prevState.yourKolejka,
            CharSpacing: parseInt(coords.charSpacing),
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            FontStyle: coords.fontStyle,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourTeamLogo") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourTeamLogo: {
            ...prevState.yourTeamLogo,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            ScaleToWidth: parseInt(coords.width),
            ScaleToHeight: parseInt(coords.height),
          },
        }));
      } else if (coords.className === "opponentImage") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          opponentImage: {
            ...prevState.opponentImage,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            ScaleToWidth: parseInt(coords.width),
            ScaleToHeight: parseInt(coords.height),
          },
        }));
      } else if (coords.className === "yourTeamFirstName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourTeamFirstName: {
            ...prevState.yourTeamFirstName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourTeamSecondName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourTeamSecondName: {
            ...prevState.yourTeamSecondName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourTeamName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourTeamName: {
            ...prevState.yourTeamName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "opponentFirstName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          opponentFirstName: {
            ...prevState.opponentFirstName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "opponentSecondName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          opponentSecondName: {
            ...prevState.opponentSecondName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "opponentName") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          opponentName: {
            ...prevState.opponentName,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "playerOne") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          playerOne: {
            ...prevState.playerOne,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            Margin: parseInt(coords.Margin),
            format: coords.format
          },
        }));
      } else if (coords.className === "reserveOne") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          reserveOne: {
            ...prevState.reserveOne,
            Formatter: ",",
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            TextAlign: coords.textAlign,
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            ScaleToHeight: parseInt(coords.height),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourTeamResult") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourTeamResult: {
            ...prevState.yourTeamResult,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourOpponentResult") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourOpponentResult: {
            ...prevState.opponentResults,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "yourPlayerOneGoal") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourPlayerOneGoal: {
            ...prevState.yourPlayerOneGoal,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            Margin: parseInt(coords.Margin),
          },
        }));
      } else if (coords.className === "opponentPlayerOneGoal") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          opponentPlayerOneGoal: {
            ...prevState.opponentPlayerOneGoal,
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            OriginX: coords.originX,
          },
        }));
      } else if (coords.className === "yourLeague") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          yourLeague: {
            ...prevState.yourLeague,
            CharSpacing: parseInt(coords.charSpacing),
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontFamily: coords.fontFamily,
            FontStyle: coords.fontStyle,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      } else if (coords.className === "typePlace") {
        setGlobalProperties((prevState) => ({
          ...prevState,
          typePlace: {
            ...prevState.typePlace,
            CharSpacing: parseInt(coords.charSpacing),
            Top: parseInt(coords.top),
            Left: parseInt(coords.left),
            FontSize: parseInt(coords.fontSize),
            FontStyle: coords.fontStyle,
            FontFamily: coords.fontFamily,
            ScaleToWidth: parseInt(coords.width),
            Fill: coords.fill,
            OriginX: coords.originX,
            OriginY: coords.originY,
          },
        }));
      }
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
    updateActiveGroupObjectCoords,
    handleSelectGroupChange,
    handleInputChange,
    handleSelectChange,
  };
};

export default useActiveObjectCoords;
