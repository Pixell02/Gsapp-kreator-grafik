import React from "react";
import useSetMultiplyProperties from "./hooks/useSetMultiplyProperties";

const MultiProperties = ({ fabricRef }) => {
  const { properties, handleNumberOfMatchesChange, handleMarginChange, handleOrientationChange } =
    useSetMultiplyProperties(fabricRef);
  const options = [
    { label: "poziomo", value: "horizontally" },
    { label: "pionowo", value: "vertically" },
  ];
  return (
    <div className="overflow-scroll d-flex h-100 flex-wrap">
      <div className="d-flex flex-column w-50">
        <label>Liczba meczów</label>
        <input
          type="number"
          value={properties.numberOfMatches}
          onChange={(e) => handleNumberOfMatchesChange(e)}
          className="h-50"
        />
      </div>
      <div className="d-flex flex-column w-50">
        <label>kierunek</label>
        <select
          className="form-control"
          onChange={(e) => handleOrientationChange(e.target)}
          value={properties.orientation}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {/* <div className='d-flex flex-column w-50'>
        <label>ilość kolumn</label>
        <input type='number' value={properties.numberOfColumns} className='h-50' />
      </div> */}
      <div className="d-flex flex-column w-50">
        <label>odstęp</label>
        <input type="number" value={properties.Margin} onChange={(e) => handleMarginChange(e)} className="h-50" />
      </div>
    </div>
  );
};

export default MultiProperties;
