import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";

const useTeamOption = () => {
  const [teamOption, setTeamOption] = useState([]);
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: LicenseTeams } = useTeamLicenseCollection("Teams");

  useEffect(() => {
    const combinedOptions = [];

    if (Team?.length > 0) {
      const TeamOption = Team?.map((Team) => ({
        value: { ...Team },
        label: Team.firstName + " " + Team.secondName,
      }));
      combinedOptions.push(...TeamOption);
    }
    if (LicenseTeams?.length > 0) {
      const LicenseTeamOption = LicenseTeams?.map((item) => ({
        value: { ...item },
        label: item.firstName + " " + item.secondName,
      }));
      combinedOptions.push(...LicenseTeamOption);
    }

    setTeamOption(combinedOptions);
  }, [Team, LicenseTeams]);

  return teamOption;
};

export default useTeamOption;
