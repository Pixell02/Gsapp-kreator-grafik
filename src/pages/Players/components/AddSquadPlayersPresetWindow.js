import React, { useEffect, useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import useTeamContext from "../../Creator/hooks/useTeamContext";
import Select from "react-select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
const AddSquadPlayersPresetWindow = ({ onClose, Players }) => {
  const { user } = useAuthContext();
  const { reservePlayers, selectedPlayers, handlePlayerChecked, selectedReserve, handleReserveChecked } =
    useTeamContext();
  const [presetName, setPresetName] = useState("skład");
  const [capitan, setCapitan] = useState(null);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const handleClose = () => {
    onClose();
  };
  const [playerSelect, setPlayerSelect] = useState(null);
  useEffect(() => {
    const option = selectedPlayers?.map((player) => ({
      label: (player.number || "") + " " + player.firstName + " " + player.secondName,
      value: {
        number: player.number,
        firstName: player.firstName,
        secondName: player.secondName,
        age: player?.age,
      },
    }));
    setPlayerSelect(option);
  }, [selectedPlayers]);
  const handleSave = () => {

    addDoc(collection(db, "squadPreset"), {
      squadPlayers: selectedPlayers,
      reservePlayers: reservePlayers,
      capitan: capitan,
      goalkeeper: goalkeeper,
      presetName: presetName,
      uid: user.uid
    })

    onClose();
  }

  const [selectedWindow, setSelectedWindow] = useState(1);

  return (
    <div className="active-modal">
      <div className="add-window yourTeam-panel-window">
        <div className="d-flex w-100 justify-content-around">
          <button onClick={() => setSelectedWindow(1)} className="btn">
            Wyjściowa 11
          </button>
          <button onClick={() => setSelectedWindow(2)} className="btn">
            Rezerwowi
          </button>
          <label><input type="checkbox" /><span>asdasd</span></label>
        </div>
        <div>
          <label>Nazwa wzoru</label>
          <input type="text" value={presetName} onChange={(e) => setPresetName(e.target.value)} />
        </div>
        <div className="players-window">
          {selectedWindow === 1 && (
            <>
              {Players?.map((player, i) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPlayers.some(
                        (selectedPlayer) =>
                          selectedPlayer.firstName === player.firstName &&
                          selectedPlayer.secondName === player.secondName &&
                          selectedPlayer.number === player.number
                      )}
                      onChange={() => handlePlayerChecked(player)}
                    />
                    <span>{player.number + " " + player.firstName + " " + player.secondName}</span>
                  </label>
                </div>
              ))}
            </>
          )}
          {selectedWindow === 2 && (
            <>
              {reservePlayers?.map((reserve, i) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedReserve.some(
                        (selectedPlayer) =>
                          selectedPlayer.firstName === reserve.firstName &&
                          selectedPlayer.secondName === reserve.secondName &&
                          selectedPlayer.number === reserve.number
                      )}
                      onChange={() => handleReserveChecked(reserve)}
                    />
                    <span>{reserve.number + " " + reserve.firstName + " " + reserve.secondName}</span>
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
        {selectedWindow === 1 && (
          <div className="mb-5">
            <span>Kapitan</span>
            <Select options={playerSelect} onChange={(option) => setCapitan(option.value)} />
            <span>Bramkarz</span>
            <Select options={playerSelect} onChange={(option) => setGoalkeeper(option.value)} />
          </div>
        )}
        <div className="d-flex w-100 justify-content-end">
          <button className="btn" onClick={handleClose}>
            Zamknij
          </button>
          <button className="btn" onClick={handleSave}>
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSquadPlayersPresetWindow;
