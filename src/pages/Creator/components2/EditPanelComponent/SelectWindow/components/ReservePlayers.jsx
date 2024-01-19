import React from "react";
import "./startingPlayers.css";
import { useTeamContext } from "../../../../context/teamContext";
import useReserveFabricObject from "../hooks/useReserveFabricObject";

const ReservePlayers = ({ fabricRef, coords, isModalOpen }) => {
  const { reservePlayers, handleReserveChecked } = useTeamContext();

  const { selectedReserve } = useReserveFabricObject(fabricRef, coords.reserveOne);

  return (
    <div className={isModalOpen.id === 2 ? "w-100 d-flex align-items-center flex-column" : "d-none"}>
      {reservePlayers?.map((player, i) => (
        <div className="w-100 d-flex flex-row" key={i}>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                style={{ width: "50px", height: "50px" }}
                checked={selectedReserve.some(
                  (selectedPlayer) =>
                    selectedPlayer.firstName === player.firstName &&
                    selectedPlayer.secondName === player.secondName &&
                    selectedPlayer.number === player.number
                )}
                onChange={() => handleReserveChecked(player)}
                name={player.firstName}
              />
              <span>{(player.number || "") + " " + player.firstName + " " + player.secondName}</span>
            </label>
          </div>
          <div className="player-image">{player.img && <img src={player.img} alt="error" />}</div>
        </div>
      ))}
    </div>
  );
};

export default ReservePlayers;
