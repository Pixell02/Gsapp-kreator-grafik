import React from "react";
import Select from "react-select";
import usePlacePreset from "./hooks/usePlacePreset";

const PlacePreset = ({ fabricRef, themeOption, coords, name }) => {
  const { options, setSelectedPlace } = usePlacePreset(
    fabricRef,
    coords,
    themeOption,
    name
  );

  return (
    <div>
      {options?.length > 0 && (
        <>
          <label>Miejsce</label>
          <Select
            options={options}
            onChange={(option) => setSelectedPlace(option.value)}
          />
        </>
      )}
    </div>
  );
};

export default PlacePreset;
