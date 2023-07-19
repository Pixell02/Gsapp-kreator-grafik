import React, { useContext, useEffect } from "react";
import originY from "./originY";
import originX from "./originX";
import fonts from "./fonts";
import { BackgroundContext } from "../../Context/BackgroundContext";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";

const TextUniversalProperties = ({ coords, canvasRef, setCoords, handleSelectChange, handleInputChange }) => {
 
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
      <div className="d-flex align-items-center">
        <span className="mx-2">Nazwa obiektu</span>{" "}
        <input
          className="w-50"
          type="text"
          name="className"
          value={coords.className}
          onChange={handleInputChange}
        />
      </div>
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
          kolor: <input type="color" value={fill} className="w-25" name="Fill" onChange={handleInputChange} />
        <span style={{fontSize: "10px", width: "50px"}}>odstęp między literami:</span>
        <input
          type="number"
          value={coords.CharSpacing}
          className="w-25"
          name="charSpacing"
          onChange={handleInputChange}
        />
        </div>
        
      </div>

      <div className="d-flex w-100 flex-row mt-2" style={{ fontSize: "10px" }}>
        <div className="w-50 d-flex flex-column">
        styl czcionki:
        <select
          name="fontStyle"
          className="form-control w-100"
          value={coords.FontStyle}
          onChange={(e) => handleSelectChange(e)}
        >
          <option value="normal">normal</option>
          <option value="italic">italic</option>
        </select>
        </div>
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
      </div>

      <div className="d-flex w-100 mt-2">
        <div className="w-100 ml-1 d-flex flex-row">
          <div className="w-50 d-flex flex-column">
          <span style={{fontSize: "10px"}}>rozmiar czcionki :</span>
          <input type="number" className="w-50" name="FontSize" value={coords.FontSize} onChange={handleInputChange} />
          </div>
          <div className='d-flex w-50 flex-column'>
        <div>kąt: <input type='number' value={coords.Angle} className='w-50' name='Angle' onChange={handleInputChange} /></div>
      </div>
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
};

export default TextUniversalProperties;
