import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";

const useTeamOption = () => {
  const [teamOption, setTeamOption] = useState();
  const { user } = useAuthContext();
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: LicenseTeams } = useTeamLicenseCollection("Teams");

  useEffect(() => {
    if (Logo?.length > 0) {
      const TeamOption = Logo?.map((logo) => ({
        value: logo.img,
        label: logo.firstName + "." + logo.secondName,
      }));
      setTeamOption((prev) => [prev, ...TeamOption]);
    }
    if (LicenseTeams?.length > 0) {
      const LicenseTeamOption = LicenseTeams?.map((item) => ({
        value: item.img,
        label: item.firstName + "." + item.secondName,
      }));
      setTeamOption((prev) => [prev, ...LicenseTeamOption]);
    }
  }, [Logo, LicenseTeams]);

  return teamOption;
};

export default useTeamOption;
