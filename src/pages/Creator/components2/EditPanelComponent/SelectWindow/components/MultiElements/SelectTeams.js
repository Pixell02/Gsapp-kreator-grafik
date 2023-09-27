import React from "react";
import Select from "react-select";
import useSelectTeams from "./hooks/useSelectTeams";

const SelectTeams = ({ fabricRef, coords, selectedMatch }) => {
  const { teamOption, setSelectedHost, setSelectedGuest } = useSelectTeams(
    fabricRef,
    coords,
    selectedMatch
  );

  return (
    <div className="d-flex w-100 flex-column">
      <div className="d-flex w-100 flex-column">
        <span>Gospodarz</span>
        <Select
          options={teamOption}
          onChange={(option) => setSelectedHost(option)}
        />
      </div>
      <div className="d-flex w-100 flex-column mt-2">
        <span>Gość</span>
        <Select
          options={teamOption}
          onChange={(option) => setSelectedGuest(option)}
        />
      </div>
    </div>
  );
};

export default SelectTeams;
