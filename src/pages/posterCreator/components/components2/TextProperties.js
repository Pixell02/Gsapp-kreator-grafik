import React, { useEffect } from "react";
import fonts from "./fonts";
import originX from "./originX";
import originY from "./originY";
import { useContext } from "react";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { BackgroundContext } from "../../Context/BackgroundContext";

export default function TextProperties({ coords, canvasRef, setCoords, handleInputChange, handleSelectChange }) {
  const {color} = useContext(BackgroundContext)
  const {globalProperties} = useContext(GlobalPropertiesContext)
  const themeOptions = globalProperties?.[coords.className]?.themeOption;
  const themeOption = themeOptions?.find(option => option.label === color.name);
 
  const fill = themeOption ? themeOption.Fill : coords.Fill;
  
  useEffect(() => {
    if (canvasRef.current?.backgroundImage) {
      const canvas = canvasRef.current;
    
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set("fill", fill);
        canvas.renderAll();
      }
    }
  },[fill, color, canvasRef])
  return (
    <div>
      <div>Nazwa obiektu : {coords.className}</div>
      <div className="d-flex">
        <div>
          X: <input type="number" value={coords.Left} className="w-75" name="Left" onChange={handleInputChange} />
        </div>
        <div>
          Y: <input type="number" value={coords.Top} className="w-75" name="Top" onChange={handleInputChange} />
        </div>
      </div>
      <div className="d-flex w-100">
        <div>
          sz:
          <input type="number" value={coords.Width} className="w-75" name="Width" onChange={handleInputChange} />
        </div>
        <div>
          w:
          <input type="number" value={coords.Height} className="w-75" name="Height" onChange={handleInputChange} />
        </div>
      </div>
      <div className="d-flex mx-2 w-100">
        <div className="d-flex w-100">
          kolor: <input type="color" value={fill} className="w-50" name="Fill" onChange={handleInputChange} />
        </div>
      </div>

      <div className="d-flex w-100 flex-column mt-2" style={{ fontSize: "10px" }}>
        odstęp między literami:{" "}
        <input
          type="number"
          value={coords.CharSpacing}
          className="w-50"
          name="charSpacing"
          onChange={handleInputChange}
        />
        styl czcionki:
        <select
          name="fontStyle"
          className="form-control w-75"
          value={coords.FontStyle}
          onChange={(e) => handleSelectChange(e)}
        >
          <option value="normal">normal</option>
          <option value="italic">italic</option>
        </select>
      </div>

      <div className="d-flex w-100 mt-2">
        <div className="d-flex flex-column w-100">
          czcionka:
          <select
            name="fontFamily"
            className="form-control w-75"
            value={coords.FontFamily}
            defaultValue={coords.FontFamily}
            onChange={(e) => handleSelectChange(e)}
          >
            {fonts && fonts.map((team) => <option value={team.value}>{team.label}</option>)}
          </select>
        </div>
        <div className="w-100 ml-1">
          rozmiar czcionki :{" "}
          <input type="number" className="w-50" name="FontSize" value={coords.FontSize} onChange={handleInputChange} />
        </div>
      </div>
      <div>
        punkt odniesienia X :{" "}
        <select
          name="originX"
          className="form-control"
          value={coords.OriginX}
          defaultValue={coords.OriginX}
          onChange={(e) => handleSelectChange(e)}
        >
          {originX && originX.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>{" "}
      </div>
      <div>
        punkt odniesienia Y :{" "}
        <select
          name="originY"
          className="form-control"
          value={coords.OriginY}
          defaultValue={coords.OriginY}
          onChange={(e) => handleSelectChange(e)}
        >
          {originY && originY.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>{" "}
      </div>
    </div>
  );
}
