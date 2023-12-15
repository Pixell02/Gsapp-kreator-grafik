import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";

const useOpponents = () => {
  const [options, setOptions] = useState(null);
  const { user } = useAuthContext();
  const { documents: LicenseOpponents } = useTeamLicenseCollection("Opponents");
  const { documents: Opponents } = useCollection("Opponents", [
    "uid",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    if (Opponents?.length > 0) {
      const options = Opponents.map((opponent) => ({
        value: opponent,
        label: opponent.firstName + " " + opponent.secondName,
      }));
      setOptions([...options]);
    }
    if (LicenseOpponents?.length > 0) {
      const additionalOption = LicenseOpponents.map((item) => ({
        value: item,
        label: `${item.firstName} ${item.secondName}`,
      }));

      setOptions([...additionalOption]);
    }
  }, [Opponents, LicenseOpponents]);

  return options;
};

export default useOpponents;
