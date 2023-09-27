import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useTeamOption from "../hooks/useTeamOption";

export const useYourTeamNameAndLogo = () => {
  const [LogoLink, setLogoLink] = useState(null);
  const [yourName, setYourName] = useState(null);

  const { images: yourLogo } = useFetch(LogoLink);

  const teamOption = useTeamOption();

  useEffect(() => {
    if (teamOption?.length === 1) {
      setLogoLink(teamOption[0].value);
      setYourName(teamOption[0].label);
    }
  }, [teamOption]);

  const getTeamOption = (option) => {
    setLogoLink(option.value);
    setYourName(option.label);
  };

  return { teamOption, getTeamOption, yourLogo, yourName };
};
