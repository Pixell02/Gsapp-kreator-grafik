import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type SportOption = {
  label: string;
  value: string;
};

type ContextData = {
  sportKeys: string[] | null;
  setSportKeys: Dispatch<SetStateAction<string[] | null>>;
  sportOptions: SportOption[] | null;
  selectedSportKeys: string | null;
  setSelectedSportKeys: Dispatch<SetStateAction<string | null>>;
};

export const TeamContext = createContext<ContextData | null>(null);

export const TeamProvider = ({ children }: PropsWithChildren) => {
  const [sportKeys, setSportKeys] = useState<string[] | null>(null);
  const [sportOptions, setSportOptions] = useState<SportOption[] | null>(null);
  const [selectedSportKeys, setSelectedSportKeys] = useState<string | null>(null);
  useEffect(() => {
    const options = sportKeys?.map((sport) => ({
      label: sport,
      value: sport,
    }));
    setSportOptions(options as SportOption[]);
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
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw Error("TeamContext out of");
  }

  return context;
};
