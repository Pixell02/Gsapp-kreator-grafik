import { useState } from "react";
import EditYourTeamWindow from "./EditYourTeamWindow";
import "./YourTeamBlock.css";

import * as Icon from "react-bootstrap-icons";

export default function YourTeamBlock({ Team }) {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  const [team, setTeam] = useState(Team);
  
  return (
    <div className="your-team-catalog-container">
     
      {team.map((team) => (
        
        <div key={team.uid} className="your-team-window" id="yourTeamWindow">
          <div className="your-team-name-content">
            <span key={team.uid} className="your-team-name">
              {team.firstName + " "}
              {team.secondName ? team.secondName : null}
            </span>
            <div
              className="icon-item"
              onClick={(e) => setOpenEditYourTeam(true)}
            >
              <Icon.ThreeDotsVertical />
            </div>
          </div>

          <div className="your-team-image-content">
            <img src={team.img} alt={team.firstName + " " + team.secondName} />
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
