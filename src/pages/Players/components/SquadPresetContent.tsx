import { useRef, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { DocumentData } from "firebase/firestore";
import { squadPreset } from "../../../types/playerAndSquadTypes";
import SlabBlock from "../../../components/SlabBlock";
import EditSquadPlayersPresetWindow from "./EditSquadPlayersPresetWindow";
import AddSquadPlayersPresetWindow from "./AddSquadPlayersPresetWindow";
import { TeamProvider } from "../../Creator/context/teamContext";
import usePlayers from "../hooks/usePlayers";
import Title from "../../../components/main-content-elements/Title";

const SquadPresetContent = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<DocumentData | squadPreset | undefined | null>(null);
  const { documents: squadPreset } = useCollection("squadPreset", ["uid", "==", user.uid]);
  const { documents: LicenseSquadPreset } = useTeamLicenseCollection("squadPreset");
  const [openPresetModal, setOpenPresetModal] = useState(false);
  const [openEditPresetModal, setEditPresetModal] = useState(false);
  const { filteredPlayers } = usePlayers();
  const editSlabClick = (item: squadPreset) => {
    setData(item);
    setEditPresetModal(true);
  };
  const hideElement = useRef(null);
  return (
    <div className="main-content" ref={hideElement}>
      <div className="ml-5">
        <TeamProvider>
          {openPresetModal && (
            <AddSquadPlayersPresetWindow Players={filteredPlayers} onClose={() => setOpenPresetModal(false)} />
          )}
          {openEditPresetModal && (
            <EditSquadPlayersPresetWindow
              data={data}
              Players={filteredPlayers}
              onClose={() => setEditPresetModal(false)}
            />
          )}
        </TeamProvider>
        <Title title="Wzory" />
        <button className="btn" onClick={() => setOpenPresetModal(true)}>
          Stwórz wzór
        </button>
        <ItemContainer>
          {squadPreset?.map((item, i) => (
            <SlabBlock key={i} item={item} editClick={editSlabClick} type={"squadPreset"} />
          ))}
          {LicenseSquadPreset?.map((item: squadPreset, i: number) => (
            <SlabBlock key={i} item={item} editClick={editSlabClick} type={"squadPreset"} />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
};

export default SquadPresetContent;
