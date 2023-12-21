import { useEffect, useState } from "react";
import { Team } from "../../../types/teamTypes";

type option = {
  label: string;
  value: string;
};

export const useTeams = (Teams: Team[], sport: string) => {
  const [teamOptions, setTeamOptions] = useState<option[] | []>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  useEffect(() => {
    if (sport) {
      setSelectedTeam(sport);
    }
  }, [sport]);
  useEffect(() => {
    if (Teams) {
      const teamOption = Teams.map((team) => ({
        label: team.firstName + " " + team.secondName,
        value: team.firstName + " " + team.secondName,
      }));
      setTeamOptions(teamOption);
    }
  }, [Teams]);

  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
  };

  return { teamOptions, selectedTeam, handleTeamChange };
};
