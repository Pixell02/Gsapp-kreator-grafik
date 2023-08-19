import React from "react";
import useSelectTeams from "./hooks/useSelectTeams";
import Select from "react-select";

const SelectLeagueTeams = ({ fabricRef, coords, selectedMatch }) => {
  const { teamOption, setSelectedGuest } = useSelectTeams(fabricRef, coords, selectedMatch);

  return (
    <div className="d-flex w-100 flex-column">
      <span>Drużyna</span>
      <Select options={teamOption} onChange={(option) => setSelectedGuest(option)} />
    </div>
  );
};

export default SelectLeagueTeams;
