import React from "react";
import ProvinceTeamsTable from "./Teams/ProvinceTeamsTable";
import SelectBar from "./Teams/SelectBar";
import useProvince from "./Teams/hooks/useProvince";

const Teams = () => {
  const { options, selectedProvince, setSelectedProvince } = useProvince();

  return (
    <div>
      <SelectBar
        options={options}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
      />
      <ProvinceTeamsTable selectedProvince={selectedProvince} />
    </div>
  );
};

export default Teams;
