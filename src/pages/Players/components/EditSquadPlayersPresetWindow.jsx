import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { db } from "../../../firebase/config";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { useTeamContext } from "../../Creator/context/teamContext";

const EditSquadPlayersPresetWindow = ({ onClose, Players, data }) => {
  const { reservePlayers, selectedPlayers, handlePlayerChecked, selectedReserve, handleReserveChecked } =
    useTeamContext();
  const [presetName, setPresetName] = useState(data.presetName);
  const [capitan, setCapitan] = useState(data.capitan);
  const [goalkeeper, setGoalkeeper] = useState(data.goalkeeper);
  const handleClose = () => {
    onClose();
  };
  const [playerSelect, setPlayerSelect] = useState(null);
  useEffect(() => {
    data.squadPlayers.forEach((player) => {
      handlePlayerChecked(player);
    });
    data.reservePlayers.forEach((reserve) => {
      handleReserveChecked(reserve);
    });
  }, [data]);
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
    const docRef = doc(db, "squadPreset", data.id);
    updateDoc(docRef, {
      squadPlayers: selectedPlayers,
      reservePlayers: reservePlayers,
      capitan: capitan,
      goalkeeper: goalkeeper,
      presetName: presetName,
    });

    onClose();
  };

  const [selectedWindow, setSelectedWindow] = useState(1);
  return ReactDOM.createPortal(
    <div className="active-modal">
      <div className="add-window yourTeam-panel-window">
        <div className="d-flex w-100 justify-content-around">
          <button onClick={() => setSelectedWindow(1)} className="btn">
            Wyjściowa 11
          </button>
          <button onClick={() => setSelectedWindow(2)} className="btn">
            Rezerwowi
          </button>
        </div>
        <div>
          <label>Nazwa wzoru</label>
          <input type="text" value={presetName} onChange={(e) => setPresetName(e.target.value)} />
        </div>
        <div className="players-window">
          {selectedWindow === 1 && (
            <>
              {Players?.map((player, i) => (
                <div className="checkbox-container" key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPlayers?.some(
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
                      checked={selectedReserve?.some(
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
            <select className="form-control" value={capitan} onChange={(option) => setCapitan(option.value)}>
              {playerSelect?.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </select>
            <span>Bramkarz</span>
            <select className="form-control" value={goalkeeper} onChange={(option) => setGoalkeeper(option.value)}>
              {playerSelect?.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </select>
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
    </div>,
    document.getElementById("portal")
  );
};

export default EditSquadPlayersPresetWindow;
