import { Dispatch, SetStateAction, useRef, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Player, squadPreset } from "../../../types/playerAndSquadTypes";
import SlabBlock from "../../../components/SlabBlock";
import EditSquadPlayersPresetWindow from "./EditSquadPlayersPresetWindow";
import AddSquadPlayersPresetWindow from "./AddSquadPlayersPresetWindow";
import usePlayers from "../hooks/usePlayers";
import Title from "../../../components/main-content-elements/Title";
import Portal from "../../../components/Portal";
import { TeamProvider } from "../../Creator/context/teamContext";

const SquadPresetContent = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<squadPreset | null>(null);
  const { documents: squadPreset } = useCollection("squadPreset", ["uid", "==", user.uid]);
  const { documents: LicenseSquadPreset } = useTeamLicenseCollection("squadPreset");
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
                data={data as squadPreset}
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
          {(squadPreset as squadPreset[])?.map((item, i) => (
            <SlabBlock
              key={i}
              item={item}
              setSelectedModal={setSelectedModal}
              setData={setData as Dispatch<SetStateAction<squadPreset>>}
              type={"squadPreset"}
            />
          ))}
          {(LicenseSquadPreset as squadPreset[])?.map((item, i) => (
            <SlabBlock
              key={i}
              item={item}
              setSelectedModal={setSelectedModal}
              setData={setData as Dispatch<SetStateAction<squadPreset>>}
              type={"squadPreset"}
            />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
};

export default SquadPresetContent;
