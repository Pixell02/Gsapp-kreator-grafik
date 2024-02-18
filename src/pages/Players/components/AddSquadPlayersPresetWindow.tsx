import { Dispatch, SetStateAction, useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useTeamContext } from "../../Creator/context/teamContext";
import ButtonContainer from "../../../components/ButtonContainer";
import useSquadPreset from "../hooks/useSquadPreset";
import PlayerCheckbox from "./PlayerCheckbox";
import Select from "../../../components/Select";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Player } from "../../../types/teamTypes";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
  Players: Player[];
};

const AddSquadPlayersPresetWindow = ({ setSelectedModal, Players }: props) => {
  const {
    squadPreset,
    setSquadPreset,
    handleValueChange,
    playerSelect,
    goalkeeperId,
    handleSelectedValueChange,
    capitanId,
    setSelectedPlayers,
    setSelectedReserve,
  } = useSquadPreset();
  const { reservePlayers, handlePlayerChecked, handleReserveChecked } = useTeamContext();

  const { user } = useAuthContext();
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
    addDoc(collection(db, "squadPreset"), squadPreset);
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
                  handleCheck={() => handlePlayerChecked(player, "squadPlayers")}
                />
              ))}
            </>
          )}
          {selectedWindow === 2 && (
            <>
              {reservePlayers?.map((reserve: Player, i: number) => (
                <PlayerCheckbox
                  key={i}
                  selectedPlayers={squadPreset.reservePlayers as Player[]}
                  player={reserve}
                  handleCheck={() => handleReserveChecked(reserve, "reservePlayers")}
                />
              ))}
            </>
          )}
        </div>
        {selectedWindow === 1 && (
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
            />
          </div>
        )}
        <ButtonContainer handleClick={handleClose} handleSubmit={handleSave} />
      </div>
    </div>
  );
};

export default AddSquadPlayersPresetWindow;
