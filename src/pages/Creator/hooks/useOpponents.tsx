import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { Opponent } from "../context/CalendarContext";

type Options = {
  label: string;
  value: Opponent;
};

const useOpponents = () => {
  const [options, setOptions] = useState<Options[] | null>(null);
  const { user } = useAuthContext();
  const { documents: LicenseOpponents } = useTeamLicenseCollection("Opponents");
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);

  useEffect(() => {
    if (Opponents && Opponents.length > 0) {
      const options = Opponents.map((opponent) => ({
        value: opponent,
        label: opponent.firstName + " " + opponent.secondName,
      }));
      setOptions([...(options as Options[])]);
    }
    if (LicenseOpponents && LicenseOpponents?.length > 0) {
      const additionalOption = LicenseOpponents.map((item: Opponent) => ({
        value: item,
        label: `${item.firstName} ${item.secondName}`,
      }));

      setOptions([...additionalOption]);
    }
  }, [Opponents, LicenseOpponents]);

  return options;
};

export default useOpponents;
