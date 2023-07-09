import React from 'react'
import "./startingPlayers.css";
import useTeamContext from '../../../../hooks/useTeamContext';
import { useEffect } from 'react';
import showReserve from '../../SingleElements/playerOption/showReserve';

const ReservePlayers = ({ fabricRef, coords, themeOption }) => {
  
  const { reservePlayers, selectedReserve, handleReserveChecked } = useTeamContext();
  
  useEffect(() => {
    if (fabricRef.current?.backgroundImage && selectedReserve) {
      showReserve(fabricRef, selectedReserve, coords, themeOption)
    }
  },[selectedReserve])


  return (
    <div className="w-100 d-flex align-items-center flex-column">
      {reservePlayers &&
        reservePlayers.map((player, i) => (
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
            <div className="player-image">
              {player.img && <img src={player.img} />}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ReservePlayers
