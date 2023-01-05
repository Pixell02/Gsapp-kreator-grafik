import { useState } from "react";
import EditYourTeamWindow from "./EditYourTeamWindow";

import * as Icon from "react-bootstrap-icons";


export default function YourTeamBlock({ Team }) {

  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);


  return (
    <div className="catalog-container">
    {Team.map((team) => (
      <div key={team.uid} className="team-window">
      <div className="team-name-content">
        <span key={team.uid} className="name-content">
          {team.firstName + " "}
          {team.secondName ? team.secondName : null}
        </span>
      </div>
      <div className="image-content">
        <img
          src={team.img}
          alt={team.firstName + " " + team.secondName}
        />
      </div>
      <div className="icon-item" onClick={(e) => setOpenEditYourTeam(true)}>
        <Icon.PencilFill style={{ color: "black" }} />
      </div>
      {openEditYourTeam && (
        <EditYourTeamWindow
          yourTeam={team}
          open={openEditYourTeam}
          onClose={(e) => setOpenEditYourTeam(false)}
        />
      )}
    </div>
    ))}
    </div>
    
  );
}
