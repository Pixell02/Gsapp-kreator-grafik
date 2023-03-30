import React from "react";
import fonts from "./fonts";
import originX from "./originX";
import originY from "./originY";

export default function TextProperties({ coords, handleInputChange, handleSelectChange }) {
  return (
    <div>
      <div>Nazwa obiektu : {coords.className}</div>
      <div className="d-flex">
        <div>
          X: <input type="number" value={coords.left} className="w-75" name="left" onChange={handleInputChange} />
        </div>
        <div>
          Y: <input type="number" value={coords.top} className="w-75" name="top" onChange={handleInputChange} />
        </div>
      </div>
      <div className="d-flex w-100">
        <div>
          sz:
          <input type="number" value={coords.width} className="w-75" disabled />
        </div>
        <div>
          w:
          <input type="number" value={coords.height} className="w-75" disabled />
        </div>
      </div>
      <div className="d-flex mx-2 w-100">
        <div className="d-flex w-100">
          kolor: <input type="color" value={coords.fill} className="w-50" name="fill" onChange={handleInputChange} />
        </div>
      </div>
      {coords.className === "kolejka" || coords.className === "klasa" || coords.className === "miejsce" || coords.className === "data i godzina" && (
        <div className="d-flex w-100 flex-column mt-2" style={{fontSize: "10px"}}>
            odstęp między literami: <input type="number" value={coords.charSpacing} className="w-50" name="charSpacing" onChange={handleInputChange} />
          </div>
      )}
      
      <div className="d-flex w-100 mt-2">
        <div className="d-flex flex-column w-100">
          czcionka:
          <select
            name="fontFamily"
            className="form-control w-75"
            value={coords.fontFamily}
            defaultValue={coords.fontFamily}
            onChange={(e) => handleSelectChange(e)}
          >
            {fonts && fonts.map((team) => <option value={team.value}>{team.label}</option>)}
          </select>
        </div>
        <div className="w-100 ml-1">
          rozmiar czcionki :{" "}
          <input type="number" className="w-50" name="fontSize" value={coords.fontSize} onChange={handleInputChange} />
        </div>
      </div>
      <div>
        punkt odniesienia X :{" "}
        <select
          name="originX"
          className="form-control"
          value={coords.originX}
          defaultValue={coords.originX}
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
          value={coords.originY}
          defaultValue={coords.originY}
          onChange={(e) => handleSelectChange(e)}
        >
          {originY && originY.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>{" "}
      </div>
    </div>
  );
}
