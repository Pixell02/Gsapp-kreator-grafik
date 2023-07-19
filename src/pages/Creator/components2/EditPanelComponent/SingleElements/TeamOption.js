import React, { useEffect } from 'react'
import { YourTeamNameAndLogo } from '../../../hooks2/useYourTeamLogo';
import Select from 'react-select';
import { useCollection } from '../../../../../hooks/useCollection';
import { useAuthContext } from '../../../../../hooks/useAuthContext';
import teamLogo from './TeamOption/teamLogo';
import { useContext } from 'react';
import radioContext from '../../../context/radioContext';
import teamFullName from './TeamOption/teamFullName';
import teamFirstName from './TeamOption/teamFirstName';
import teamSecondName from './TeamOption/teamSecondName';
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";


export default function TeamOption({ fabricRef, coords, themeOption, posterBackground }) {
  const {language} = useContext(LanguageContext)
  const { user } = useAuthContext();
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { radioChecked } = useContext(radioContext)

  const [yourTeam, teamOption, getTeamOption, yourLogo, yourName] = YourTeamNameAndLogo(Logo);
  
  useEffect(() => {
    if (fabricRef.current?.backgroundImage) {
      teamLogo(fabricRef, yourLogo, coords, themeOption, radioChecked)
    }
  }, [fabricRef.current, yourLogo, radioChecked])
  useEffect(() => {
    
    if (fabricRef.current?.backgroundImage) {
      if (coords?.yourTeamName) {
        teamFullName(fabricRef, yourName, coords, themeOption, radioChecked)
      } 
      if (coords?.yourTeamFirstName) {
        teamFirstName(fabricRef, yourName, coords, themeOption, radioChecked)
      }
      if (coords?.yourTeamSecondName) {
        teamSecondName(fabricRef, yourName, coords, themeOption, radioChecked)
       }
    }
  }, [fabricRef.current?.backgroundImage,yourName, radioChecked, posterBackground])
  
  return (
    <div>
      {teamOption && teamOption.length > 1 && (
                <>
          <label>{translate.yourTeam[language]}</label>
                  <Select options={teamOption} onChange={getTeamOption} />
                </>
              )}
    </div>
  )
}
