import FontFaceObserver from "fontfaceobserver";
import useFormatOption from "./useFormatOption";

const useHandleChangeEvents = (fabricRef, coords, setCoords) => {
  const { squadOptions, defaultSquad, defaultReserve, reserveOptions } = useFormatOption();

  const updateActiveObjectCoords = (name, value) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (name !== "Width" && name !== "Height" && name !== "angle") {
          fabricRef.current?._objects?.forEach((object) => {
            if (object.className === activeObject.className) {
              object.set(name.charAt(0).toLowerCase() + name.slice(1), value);
            }
          });
        } else {
          if (name === "Width") {
            activeObject.set("scaleX", value / activeObject.width);
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleX", value / activeObject.width);
            }
          } else if (name === "Height") {
            activeObject.set("scaleY", value / activeObject.width);
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleY", value / activeObject.width);
            }
          } else if (name === "angle") {
            activeObject.set("angle", value);
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "angle", value);
            }
          }
        }
        canvas.renderAll();
      }
    }
  };

  const handleMultiplyObjectUpdate = (activeObject, key, value) => {
    fabricRef.current._objects.forEach((object) => {
      if (object.id === activeObject.id) {
        object.set(key, value);
      }
    });
  };

  const updatePlayerNameFormat = (value) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (value === "dotted") {
      activeObject.set("text", "I.Nazwisko");
      activeObject.set("Format", value);
      canvas.renderAll();
    } else if (value === "NumSurName") {
      activeObject.set("text", "Imie Nazwisko");
      activeObject.set("Format", value);
      canvas.renderAll();
    } else {
      activeObject.set("text", "Nazwisko");
      activeObject.set("Format", value);
      canvas.renderAll();
    }
  };
  const updateSquadFormat = (value) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const text = squadOptions[value] || defaultSquad;
    activeObject.set("text", text);
    activeObject.set("Format", value);
    canvas.renderAll();
    setCoords({...coords, Format: value });
  };

  const updateReserveFormat = (value) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const text = reserveOptions[value] || defaultReserve;
    activeObject.set("text", text);
    activeObject.set("Format", value);
    canvas.renderAll();
    setCoords({...coords, Format: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateActiveObjectCoords(name, value);

    setCoords({
      ...coords,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { value, name } = e.target;

    if (name === "fontFamily") {
      const font = new FontFaceObserver(value);
      font.load().then(() => {
        updateActiveObjectCoords(name, value);
        setCoords({ ...coords, [name]: value });
      });
    } else if (name === "Format") {
      if (coords.className === "playerOne") {
        updateSquadFormat(value);
      } else if (coords.className === "reserveOne") {
        updateReserveFormat(value);
      } else if (coords.className === "player") {
        updatePlayerNameFormat(value);
      }
      setCoords({ ...coords, [name]: value });
    } else {
      updateActiveObjectCoords(name, value);
      setCoords({ ...coords, [name]: value });
    }
  };

  return {
    updateActiveObjectCoords,
    handleInputChange,
    handleSelectChange,
  };
};

export default useHandleChangeEvents;
