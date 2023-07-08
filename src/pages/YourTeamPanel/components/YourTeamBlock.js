import { useState } from "react";
import EditYourTeamWindow from "./EditYourTeamWindow";
import "./YourTeamBlock.css";

import * as Icon from "react-bootstrap-icons";

export default function YourTeamBlock({ Team }) {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  const [data, setData] = useState();

  const editClick = (e, team) => {
    setOpenEditYourTeam(true);
    setData(team);
  };

  return (
    <div className="your-team-catalog-container d-flex flex-wrap">
      {Team &&
        Team.map((team) => (
          <div key={team.id} className="your-team-window ml-5" id="yourTeamWindow">
            <div className="your-team-name-content">
              <span className="your-team-name">
                {team.firstName + " "}
                {team.secondName ? team.secondName : null}
              </span>
              
                <div className="option-container" onClick={(e) => setOpenEditYourTeam(true)}>
                  <button
                    className="button"
                    key={team.id}
                    onClick={(e) => {
                      editClick(e, team);
                    }}
                  >
                    <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0", position: "relative", zIndex: "-1" }} />
                  </button>
                </div>
              
            </div>

            <div className="your-team-image-content">
              {team.img ? <img src={team.img} alt={team.firstName + " " + team.secondName} /> : null}
            </div>
          </div>
        ))}
      {data && openEditYourTeam && (
        <EditYourTeamWindow yourTeam={data} open={openEditYourTeam} onClose={(e) => setOpenEditYourTeam(false)} />
      )}
    </div>
  );
}
