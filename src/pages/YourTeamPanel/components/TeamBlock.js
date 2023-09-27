import React from "react";
import * as Icon from "react-bootstrap-icons";

const TeamBlock = ({ team, setOpenEditYourTeam, editClick }) => {
  return (
    <div className="your-team-window ml-5" id="yourTeamWindow">
      <div className="your-team-name-content">
        <span className="your-team-name">
          {team.firstName + " "}
          {team.secondName ? team.secondName : null}
        </span>

        <div
          className="option-container"
          onClick={(e) => setOpenEditYourTeam(true)}
        >
          <button
            className="button"
            key={team.id}
            onClick={(e) => {
              editClick(e, team);
            }}
          >
            <Icon.ThreeDotsVertical
              style={{
                margin: "5px 0 0 0",
                position: "relative",
                zIndex: "-1",
              }}
            />
          </button>
        </div>
      </div>

      <div className="your-team-image-content">
        {team.img ? (
          <img src={team.img} alt={team.firstName + " " + team.secondName} />
        ) : null}
      </div>
    </div>
  );
};

export default TeamBlock;
