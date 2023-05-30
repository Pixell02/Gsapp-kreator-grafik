import React from "react";
import Select from "react-select";
import useTimeTable from "../hooks2/useTimeTable";

export default function ResultTableEdit({
  opponent,
  selectValues,
  radioValues,
  handleSelectChange,
  handleRadioChange,
  yourTeamResultsValue,
  handleYourTeamResultChange,
  opponentTeamResultsValue,
  handleOpponentTeamResultChange,
  selectNamesValues,
  selectLogoValues,
  coords,
  opponents,
  selectHostLogoValues,
  selectHostNamesValues,
  handleSelectHostChange,
  concated,
  manyLeaguesValues,
  setManyLeaguesValues,
  handleLeagueChange,
}) {
  const { loops } = useTimeTable(Array(4).fill({}));

  return (
    <div>
      {loops &&
        loops.map((loop, i) => (
          <div key={i} className="timeTable-container">
            {coords && coords.type !== "league" && (
              <>
                <>
                <label className="label-container">Gość{` ${i + 1}`}</label>
                <Select
                  className="select-react-container"
                  options={concated}
                  onChange={(option) => handleSelectChange(option, i)}
                />
              </>
                <div className="option-container">
                  <div className="input-container">
                    <label className="label-container">
                      <input
                        type="radio"
                        value="radio1"
                        checked={radioValues[i] === "radio1"}
                        onChange={(e) => handleRadioChange(i, e.target.value)}
                      />
                      <span>Gospodarz</span>
                    </label>
                  </div>
                  <div className="input-container">
                    <label className="label-container">
                      <input
                        type="radio"
                        value="radio2"
                        checked={radioValues[i] === "radio2"}
                        onChange={(e) => handleRadioChange(i, e.target.value)}
                      />
                      <span>Gość</span>
                    </label>
                  </div>
                  {coords && coords.yourLeagueOne && (
                    <>
                      <label key={i} className="label-container d-flex align-items-start w-100">
                        Liga
                      </label>
                      <input
                        type="text"
                        value={manyLeaguesValues[i]}
                        onChange={(e) => handleLeagueChange(i, e.target.value)}
                      />
                    </>
                  )}
                </div>
              </>
            )}

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
            <label>Wynik{` ${i + 1}`}</label>
            <div className="result-container">
              <input
                type="number"
                value={yourTeamResultsValue[i]}
                onChange={(e) => handleYourTeamResultChange(e.target.value, i)}
              />
              <span>-</span>
              <input
                type="number"
                value={opponentTeamResultsValue[i]}
                onChange={(e) => handleOpponentTeamResultChange(e.target.value, i)}
              />
            </div>
            {/* <label>Przeciwnik</label>
            <Select options={opponent} onChange={(option) => handleSelectChange(option, i)} /> */}
          </div>
        ))}
    </div>
  );
}
