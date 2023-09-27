import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../../../hooks/useCollection";

const useTeamOption = () => {
  const [teamOption, setTeamOption] = useState(null);
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: Opponents } = useCollection("Opponents", [
    "uid",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    const combinedOptions = [];

    if (Teams?.length) {
      const options = Teams?.map((team) => ({
        label: team.firstName + " " + team.secondName,
        value: team.img,
      }));
      combinedOptions.push(...options);
    }
    if (Opponents?.length) {
      const options = Opponents?.map((opponent) => ({
        label: opponent.firstName + " " + opponent.secondName,
        value: opponent.img,
      }));
      combinedOptions.push(...options);
    }
    setTeamOption(combinedOptions);
  }, [Teams, Opponents]);

  return teamOption;
};

export default useTeamOption;
