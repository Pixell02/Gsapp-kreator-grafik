import React, { SetStateAction, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import usePlacePreset from "./hooks/usePlacePreset";
import { textCoordsProps } from "./hooks/useTextLayer";

type PlaceOption = {
  label: string;
  value: string;
};

type PlacePresetProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: textCoordsProps;
  name: string;
  defaultValue?: string;
};

const PlacePreset = ({ fabricRef, coords, name, defaultValue }: PlacePresetProps) => {
  const { textValue, setTextValue, options, setSelectedPlace } = usePlacePreset(coords, fabricRef);

  useEffect(() => {
    if (defaultValue) {
      setTextValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      {options && options.length > 0 && (
        <>
          <label>{name}</label>
          <Select
            options={options}
            onChange={(option: SingleValue<PlaceOption | null>) =>
              setSelectedPlace(option?.value as SetStateAction<string>)
            }
          />
        </>
      )}
      <label>{name}</label>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default PlacePreset;
