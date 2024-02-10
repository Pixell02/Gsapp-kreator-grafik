import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../../firebase/config";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { useTeamContext } from "../../Creator/context/teamContext";
import { Player, squadPreset } from "../../../types/playerAndSquadTypes";
import ButtonContainer from "../../../components/ButtonContainer";
import useSquadPreset from "../hooks/useSquadPreset";
import PlayerCheckbox from "./PlayerCheckbox";
import Select from "../../../components/Select";
import { useAuthContext } from "../../../hooks/useAuthContext";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
  Players: Player[];
  data: squadPreset;
};

const EditSquadPlayersPresetWindow = ({ Players, data, setSelectedModal }: props) => {
  const { user } = useAuthContext();
  const {
    squadPreset,
    setSelectedPlayers,
    setSquadPreset,
    setSelectedReserve,
    handleValueChange,
    playerSelect,
    handleSelectedValueChange,
    goalkeeperId,
    capitanId,
  } = useSquadPreset(data);
  const { reservePlayers, handlePlayerChecked, handleReserveChecked } = useTeamContext();

  const handleClose = () => {
    setSelectedPlayers([]);
    setSelectedReserve([]);
    setSquadPreset({
      presetName: "skład",
      capitan: null,
      goalkeeper: null,
      squadPlayers: [],
      reservePlayers: [],
      uid: user.uid,
    });
    setSelectedModal(0);
  };

  const handleSave = () => {
    const docRef = doc(db, "squadPreset", data?.id as string);
    updateDoc(docRef, squadPreset);
    setSelectedPlayers([]);
    setSelectedReserve([]);
    setSquadPreset({
      presetName: "skład",
      capitan: null,
      goalkeeper: null,
      squadPlayers: [],
      reservePlayers: [],
      uid: user.uid,
    });
    setSelectedModal(0);
  };

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
        </div>
        <div>
          <label>Nazwa wzoru</label>
          <input
            type="text"
            value={squadPreset.presetName}
            onChange={(e) => handleValueChange(e.target.value, "presetName")}
          />
        </div>
        <div className="players-window">
          {selectedWindow === 1 && (
            <>
              {Players?.map((player, i) => (
                <PlayerCheckbox
                  key={i}
                  selectedPlayers={squadPreset.squadPlayers as Player[]}
                  player={player}
                  handleCheck={handlePlayerChecked}
                />
              ))}
              <div className="mb-5">
                <Select
                  name="Kapitan"
                  id="capitan"
                  options={playerSelect}
                  value={capitanId}
                  onChange={handleSelectedValueChange}
                />
                <Select
                  name="Bramkarz"
                  options={playerSelect}
                  value={goalkeeperId}
                  id="goalkeeper"
                  onChange={handleSelectedValueChange}
                />{" "}
              </div>
            </>
          )}
          {selectedWindow === 2 && (
            <>
              {(reservePlayers as Player[])?.map((reserve, i) => (
                <PlayerCheckbox
                  key={i}
                  selectedPlayers={squadPreset.reservePlayers as Player[]}
                  player={reserve}
                  handleCheck={handleReserveChecked}
                />
              ))}
            </>
          )}
        </div>
        <ButtonContainer handleClick={handleClose} handleSubmit={handleSave} />
      </div>
    </div>
  );
};

export default EditSquadPlayersPresetWindow;
