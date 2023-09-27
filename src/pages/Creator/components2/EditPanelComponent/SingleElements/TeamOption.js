import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { LanguageContext } from "../../../../../context/LanguageContext";
import radioContext from "../../../context/radioContext";
import { useYourTeamNameAndLogo } from "../../../hooks2/useYourTeamLogo";
import translate from "../../../locales/translate.json";
import teamFirstName from "./TeamOption/teamFirstName";
import teamFullName from "./TeamOption/teamFullName";
import teamLogo from "./TeamOption/teamLogo";
import teamSecondName from "./TeamOption/teamSecondName";

export default function TeamOption({
  fabricRef,
  coords,
  themeOption,
  posterBackground,
}) {
  const { language } = useContext(LanguageContext);

  const { radioChecked } = useContext(radioContext);

  const { teamOption, getTeamOption, yourLogo, yourName } =
    useYourTeamNameAndLogo();

  useEffect(() => {
    if (fabricRef.current?._objects && yourLogo) {
      teamLogo(fabricRef, yourLogo, coords, themeOption, radioChecked);
    }
  }, [fabricRef.current, yourLogo, radioChecked]);
  useEffect(() => {
    if (fabricRef.current?._objects && yourName) {
      if (coords?.yourTeamName) {
        teamFullName(fabricRef, yourName, coords, themeOption, radioChecked);
      }
      if (coords?.yourTeamFirstName && yourName) {
        teamFirstName(fabricRef, yourName, coords, themeOption, radioChecked);
      }
      if (coords?.yourTeamSecondName && yourName) {
        teamSecondName(fabricRef, yourName, coords, themeOption, radioChecked);
      }
    }
  }, [fabricRef.current, yourName, radioChecked, posterBackground]);
  return (
    <div>
      {teamOption && teamOption.length > 1 && (
        <>
          <label>{translate.yourTeam[language]}</label>
          <Select options={teamOption} onChange={getTeamOption} />
        </>
      )}
    </div>
  );
}
