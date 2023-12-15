import { createContext, useEffect, useState } from 'react';

export const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
  const [sportKeys, setSportKeys] = useState(null);
  const [sportOptions, setSportOptions] = useState(null);
  const [selectedSportKeys, setSelectedSportKeys] = useState(null);
  useEffect(() => {
    const options = sportKeys?.map(sport => ({
      label: sport,
      value: sport,
    }));
    setSportOptions(options);
  }, [sportKeys]);
  useEffect(() => {
    if (sportOptions) setSelectedSportKeys(sportOptions[0]?.value);
  }, [sportOptions]);
  return (
    <TeamContext.Provider
      value={{
        sportKeys,
        setSportKeys,
        sportOptions,
        selectedSportKeys,
        setSelectedSportKeys,
      }}>
      {children}
    </TeamContext.Provider>
  );
};
