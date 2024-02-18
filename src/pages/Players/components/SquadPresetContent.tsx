import { Dispatch, SetStateAction, useRef, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import SlabBlock from "../../../components/SlabBlock";
import EditSquadPlayersPresetWindow from "./EditSquadPlayersPresetWindow";
import AddSquadPlayersPresetWindow from "./AddSquadPlayersPresetWindow";
import usePlayers from "../hooks/usePlayers";
import Title from "../../../components/main-content-elements/Title";
import Portal from "../../../components/Portal";
import { TeamProvider } from "../../Creator/context/teamContext";
import { Player, SquadPreset } from "../../../types/teamTypes";

const SquadPresetContent = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<SquadPreset | null>(null);
  const { documents: squadPreset } = useCollection<SquadPreset>("squadPreset", ["uid", "==", user.uid]);
  const { documents: LicenseSquadPreset } = useTeamLicenseCollection<SquadPreset>("squadPreset");
  const [selectedModal, setSelectedModal] = useState(0);
  const { filteredPlayers } = usePlayers();

  const hideElement = useRef(null);
  return (
    <div className="main-content" ref={hideElement}>
      <div className="ml-5">
        <Portal>
          <TeamProvider>
            {selectedModal === 1 && (
              <AddSquadPlayersPresetWindow Players={filteredPlayers as Player[]} setSelectedModal={setSelectedModal} />
            )}
            {selectedModal === 2 && (
              <EditSquadPlayersPresetWindow
                Players={filteredPlayers as Player[]}
                data={data as SquadPreset}
                setSelectedModal={setSelectedModal}
              />
            )}
          </TeamProvider>
        </Portal>

        <Title title="Wzory" />
        <button
          className="btn"
          onClick={() => {
            setSelectedModal(1);
          }}
        >
          Stwórz wzór
        </button>
        <ItemContainer>
          {(squadPreset as SquadPreset[])?.map((item, i) => (
            <SlabBlock
              key={i}
              item={item}
              setSelectedModal={setSelectedModal}
              setData={setData as Dispatch<SetStateAction<SquadPreset>>}
              type={"squadPreset"}
            />
          ))}
          {(LicenseSquadPreset as SquadPreset[])?.map((item, i) => (
            <SlabBlock
              key={i}
              item={item}
              setSelectedModal={setSelectedModal}
              setData={setData as Dispatch<SetStateAction<SquadPreset>>}
              type={"squadPreset"}
            />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
};

export default SquadPresetContent;
