import React from 'react'
import fonts from './fonts'
import originX from './originX'
import originY from './originY'

export default function TextboxProperties({ coords, handleInputChange, handleSelectChange }) {
  console.log(coords.textAlign)
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
      <div className="d-flex mx-2 w-100 align-items-center justify-content-start">
        <div className='d-flex w-50'>
          kolor: <input type="color" value={coords.fill} className="w-50" name="fill" onChange={handleInputChange} />
        </div>
        <div className='d-flex w-50 align-items-center justify-content-start'>
        akapit:
          <select
            style={{width: "10px"}}
            name="textAlign"
            className="form-control w-75"
            value={coords.textAlign}
            defaultValue={coords.textAlign}
            onChange={(e) => handleSelectChange(e)}
        >
          <option value="left">lewy</option>
          <option value="center">środek</option>
          <option value="right">prawo</option>
        </select>
        </div>
    </div>
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
  )
}
