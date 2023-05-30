import { useEffect, useState } from "react";

export const YourTeamNameAndLogo = (Logo) => {
  const [yourTeam, setYourTeam] = useState();
  const [yourLogo, setYourLogo] = useState();
  const [LogoLink, setLogoLink] = useState();
  const [yourName, setYourName] = useState();
  const [teamOption, setTeamOption] = useState([]);
  

  useEffect(() => {
    if (Logo) {
      const TeamOption = Logo.map((logo) => ({
        value: logo.img,
        label: logo.firstName + "." + logo.secondName,
      }));
      
      setTeamOption(TeamOption);
    }
  }, [Logo]);
  
  useEffect(() => {
    if (Logo) {
      if (Logo.length === 1) {
        setLogoLink(Logo[0].img);
        setYourName(Logo[0].firstName + "." + Logo[0].secondName)
      }
    }
  }, [Logo]);

  const getTeamOption = (option) => {
    setLogoLink(option.value);
    setYourName(option.label)
  };
  useEffect(() => {
    if (LogoLink) {
      
      fetch(`${LogoLink}`)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setYourLogo(reader.result);
          };
        });
    }
  }, [LogoLink, yourLogo]);


  return [yourTeam, teamOption, getTeamOption, yourLogo, yourName];
};
