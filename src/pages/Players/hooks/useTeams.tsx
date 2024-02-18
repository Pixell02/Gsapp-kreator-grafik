import { useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Team } from "../../../types/teamTypes";

type option = {
  label: string;
  value: string;
};

export const useTeams = (sport?: string) => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection<Team>("Teams", ["uid", "==", id || user.uid]);
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
