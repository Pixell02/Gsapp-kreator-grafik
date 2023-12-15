import { useEffect, useState } from "react"



export const useTeams = (Teams, sport) => {
 
  const [teamOptions, setTeamOptions] = useState();
  const [selectedTeam, setSelectedTeam] = useState('');
  useEffect(() => {
    if (sport) {
      setSelectedTeam(sport);
    }
  },[sport])
  useEffect(() => {
    if (Teams) {
      const teamOption = Teams.map((team) => ({
        label: team.firstName + " " + team.secondName,
        value: team.firstName + " " + team.secondName
      }))
      setTeamOptions(teamOption)
    }
  }, [Teams])
  
  const handleTeamChange = (value) => {
    setSelectedTeam(value);
  }


  return { teamOptions, selectedTeam , handleTeamChange } 
}