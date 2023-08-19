
import FontFaceObserver from "fontfaceobserver";
import useCoords from "./useCoords";

const useActiveObjectCoords = (fabricRef) => {
  const { coords, setCoords } = useCoords(fabricRef)
  const updateActiveObjectCoords = (name, value) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (name !== "Width" && name !== "Height" && name !== "angle") {
          fabricRef.current?._objects?.forEach((object) => {
            if (object.className === activeObject.className) {
              object.set(name.charAt(0).toLowerCase() + name.slice(1), value);            }
          })
          canvas.renderAll();
        } else {
          if (name === "Width") {
            activeObject.set("scaleX", Number(value) / activeObject.width);
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleX", Number(value) / activeObject.width)
            }
            canvas.renderAll();
          } else if (name === "Height") {
            activeObject.set("scaleY", Number(value) / activeObject.width);
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleY", Number(value) / activeObject.width)
            }
            canvas.renderAll();
          } else if (name === "angle") {
            activeObject.set("angle", Number(value));
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "angle", Number(value))
            }
            canvas.renderAll();
          }
        }
      }
    }
  };

  const handleMultiplyObjectUpdate = (activeObject, key, value) => {
    fabricRef.current._objects.forEach((object) => {
      if (object.id === activeObject.id) {
        object.set(key, value)
      }
    })
  }

  const updateFormat = (value, className) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (className === "player") {
          if (value === "dotted") {
            activeObject.set("text", "I.Nazwisko");
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set("text", "Imie Nazwisko");
            activeObject.set("Format", value)
            canvas.renderAll();
          } else {
            activeObject.set("text", "Nazwisko");
            activeObject.set("Format", value)
            canvas.renderAll();
          }
        } else if (className === "playerOne") {
          if (value === "dotted") {
            activeObject.set(
              "text",
              "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set(
              "text",
              "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "NumDotSurName") {
            activeObject.set(
              "text",
              "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "oneDot") {
            activeObject.set(
              "text",
              "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else {
            activeObject.set(
              "text",
              "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          }
          
        } else if (className === "reserveOne") {
          if (value === "dotted") {
            activeObject.set(
              "text",
              "88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "NumSurName") {
            activeObject.set(
              "text",
              "88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "NumDotSurName") {
            activeObject.set(
              "text",
              "88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else if (value === "oneDot") {
            activeObject.set(
              "text",
              "88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          } else {
            activeObject.set(
              "text",
              "Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko"
            );
            activeObject.set("Format", value)
            canvas.renderAll();
          }
        } 
        setCoords({ ...coords, Format: value });
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
