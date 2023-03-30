import React from 'react'

export default function Radio({radioChecked, setRadioChecked}) {
  return (
    <div className="option-container">
    <div className="input-container">
      <label className="label-container">
        <input
          type="radio"
          value="radio1"
          onChange={(e) => setRadioChecked(e.target.value)}
          checked={radioChecked === "radio1"}
        />
        <span>Gospodarz</span>
      </label>
    </div>
    <div className="input-container">
      <label>
        <input
          type="radio"
          value="radio2"
          onChange={(e) => setRadioChecked(e.target.value)}
          checked={radioChecked === "radio2"}
        />
        <span className="guest">Gość</span>
      </label>
    </div>
  </div>
  )
}
