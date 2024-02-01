import { useState } from "react";
import EditYourTeamWindow from "./EditYourTeamWindow";
import "./YourTeamBlock.css";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import TeamBlock from "./TeamBlock";

export default function YourTeamContainer({ Team }) {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  const { documents: licenseTeams } = useTeamLicenseCollection("Teams");
  const [data, setData] = useState(null);
  const editClick = (team) => {
    setOpenEditYourTeam(true);
    setData(team);
  };
  return (
    <div className="your-team-catalog-container d-flex flex-wrap">
      {Team?.map((team, i) => (
        <TeamBlock key={i} team={team} editClick={editClick} />
      ))}
      {licenseTeams?.map((item, i) => (
        <TeamBlock key={i} team={item} editClick={editClick} />
      ))}
      {data && openEditYourTeam && (
        <EditYourTeamWindow data={data} open={openEditYourTeam} onClose={() => setOpenEditYourTeam(false)} />
      )}
    </div>
  );
}
