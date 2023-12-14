import React, { useContext, useEffect } from 'react';
import Select from 'react-select';
import radioContext from '../../../context/radioContext';
import { useYourTeamNameAndLogo } from '../../../hooks2/useYourTeamLogo';
import translate from '../../../locales/translate.json';
import teamFirstName from './TeamOption/teamFirstName';
import teamFullName from './TeamOption/teamFullName';
import teamLogo from './TeamOption/teamLogo';
import teamSecondName from './TeamOption/teamSecondName';
import useThemeContext from '../../../hooks/useThemeContext';
import { useLanguageContext } from '../../../../../context/LanguageContext';

export default function TeamOption({ fabricRef, coords, posterBackground }) {
  const { language } = useLanguageContext();
  const { themeColor } = useThemeContext();
  const { radioChecked } = useContext(radioContext);

  const { teamOption, getTeamOption, yourLogo, yourName } = useYourTeamNameAndLogo();

  useEffect(() => {
    if (fabricRef.current?._objects && yourLogo && coords.yourTeamLogo) {
      teamLogo(fabricRef, yourLogo, coords, themeColor, radioChecked);
    }
  }, [fabricRef.current, yourLogo, radioChecked]);
  useEffect(() => {
    if (fabricRef.current?._objects && yourName) {
      if (coords?.yourTeamName) {
        teamFullName(fabricRef, yourName, coords, themeColor, radioChecked);
      }
      if (coords?.yourTeamFirstName && yourName) {
        teamFirstName(fabricRef, yourName, coords, themeColor, radioChecked);
      }
      if (coords?.yourTeamSecondName && yourName) {
        teamSecondName(fabricRef, yourName, coords, themeColor, radioChecked);
      }
    }
  }, [yourName, radioChecked, posterBackground, coords, themeColor, fabricRef]);

  return (
    <div>
      {teamOption?.length > 1 && (
        <>
          <label>{translate.yourTeam[language]}</label>
          <Select
            options={teamOption}
            onChange={getTeamOption}
          />
        </>
      )}
    </div>
  );
}
