import React from "react";
import Select from "react-select";
import useTimeTable from "../hooks2/useTimeTable";

export default function TimeTableEdit({
  opponent,
  opponents,
  handleRadioChange,
  radioValues,
  handleTextChange,
  handleSelectChange,
  textInputValues,
  selectValues,
  handleSelectTeamValue,
  coords,
  selectHostLogoValues,
  selectHostNamesValues,
  handleSelectHostChange,
  concated,
  numberOfMatches,
  manyLeaguesValues,
    setManyLeaguesValues,
    handleLeagueChange
}) {
  
  const { loops } = useTimeTable({ numberOfMatches });
 
  return (
    <div>
      {loops &&
        loops.map((loop, i) => (
          <div key={i} className="timeTable-container">
            {coords && (coords.type === "yourLogo" || coords.type === "connected text") && (
              <div>
                <label>
                  <input
                    type="radio"
                    value="radio1"
                    onChange={(e) => handleRadioChange(i, e.target.value)}
                    checked={radioValues[i] === "radio1"}
                  />
                  <span>Gospodarz</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="radio2"
                    onChange={(e) => handleRadioChange(i, e.target.value)}
                    checked={radioValues[i] === "radio2"}
                  />
                  <span>Gość</span>
                </label>
                <br />
              </div>
            )}
            <label>Data i godzina</label>
            <input type="text" value={textInputValues[i]} onChange={(e) => handleTextChange(i, e.target.value)} />
            {coords && coords.type === "league" && (
              <>
                <label className="label-container ">Gospodarz{` ${i + 1}`}</label>
                <Select
                  className="select-react-container"
                  options={concated}
                  onChange={(option) => handleSelectHostChange(option, i)}
                />
                <label className="label-container">Gość{` ${i + 1}`}</label>
                <Select
                  className="select-react-container"
                  
                  options={concated}
                  onChange={(option) => handleSelectChange(option, i)}
                />
              </>
            )}
            {coords && (coords.type === "yourLogo" || coords.type === "connected text") && (
              <>
                <label className="label-container">Przeciwnik {`${i + 1}`}</label>
                <Select
                  options={opponents}
                  
                  onChange={(option) => handleSelectChange(option, i)}
                />
              </>
            )}
            {coords && coords.yourLeagueOne && (
              <>
              <label key={i} className="label-container">Liga</label>
                <input
                  type="text"
                  value={manyLeaguesValues[i]}
                  onChange={(e) => handleLeagueChange(i, e.target.value)} />
              </>
            )}
          </div>
        ))}
    </div>
  );
}
