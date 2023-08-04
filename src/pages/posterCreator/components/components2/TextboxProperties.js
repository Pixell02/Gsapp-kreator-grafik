import React from "react";
import fonts from "./fonts";
import originX from "./originX";
import originY from "./originY";

export default function TextboxProperties({ coords, handleInputChange, handleSelectChange, handleSelectGroupChange }) {
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
        <div>
          <span style={{ fontSize: "10px" }}>odstęp między wierszami:</span>
          <input
            type="number"
            value={coords.LineHeight}
            step="0.01"
            className="w-75"
            name="LineHeight"
            onChange={handleInputChange}
          />
        </div>
        
      </div><div className="w-50 d-flex flex-column">
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
      <div className="d-flex mx-2 w-100 align-items-center justify-content-start">
        <div className="d-flex w-50">
          kolor: <input type="color" value={coords.Fill} className="w-50" name="Fill" onChange={handleInputChange} />
        </div>
        <div className="d-flex">
          <div>
            kąt: <input type="number" value={coords.Angle} className="w-50" name="Angle" onChange={handleInputChange} />
          </div>
        </div>
        <div className="d-flex w-50 align-items-center justify-content-start">
          akapit:
          <select
            style={{ width: "10px" }}
            name="textAlign"
            className="form-control w-75"
            value={coords.TextAlign}
            defaultValue={coords.TextAlign}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="left">lewy</option>
            <option value="center">środek</option>
            <option value="right">prawo</option>
          </select>
        </div>
        <div className="w-100">
          format:
          <select
            name="Format"
            className="form-control w-75"
            value={coords.Format}
            onChange={(e) => handleSelectChange(e, coords)}
          >
            <option value="NumDotSurName">88.Nazwisko</option>
            <option value="NumSurName">88 Nazwisko</option>
            <option value="dotted">88.I.Nazwisko</option>
            <option value="oneDot">88 I.Nazwisko</option>
            <option value="SurName">Nazwisko</option>
          </select>
        </div>
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
          name="OriginX"
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
        <select name="OriginY" className="form-control" value={coords.OriginY} onChange={(e) => handleSelectChange(e)}>
          {originY && originY.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>{" "}
      </div>
    </div>
  );
}
