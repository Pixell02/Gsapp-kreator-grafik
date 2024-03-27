import { Dispatch, SetStateAction, useMemo, useState } from "react";
import "../../../App.css";
import FilteredBlock, { Item } from "../../../components/main-content-elements/FilteredBlock";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import AddPlayerWindow from "./AddPlayerWindow";
import EditPlayerWindow from "./EditPlayerWindow";
import Portal from "../../../components/Portal";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Player } from "../../../types/teamTypes";
import { useParams } from "react-router-dom";

function PlayerContent() {
  const { id } = useParams();
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const { documents: players } = useCollection<Player>("Players", ["uid", "==", id || user.uid]);
  const { documents: LicensedPlayers } = useTeamLicenseCollection<Player>("Players");
  const [selectedModal, setSelectedModal] = useState(0);
  const translate: translationProps = translation;
  const [data, setData] = useState<Player | null>(null);

  const modalComponents = useMemo(
    () => [
      { id: 1, component: <AddPlayerWindow setSelectedModal={setSelectedModal} /> },
      { id: 2, component: <EditPlayerWindow data={data as Player} setSelectedModal={setSelectedModal} /> },
    ],
    [data]
  );

  return (
    <div className="ml-5">
      <Portal>{modalComponents.map(({ id, component }) => selectedModal === id && component)}</Portal>
      <Title title={translate.players[language]} />
      <button className="btn primary-btn" onClick={() => setSelectedModal(1)}>
        {translate.addPlayer[language]}
      </button>
      <ItemContainer>
        <div className="d-flex flew-row">
          <div className="catalog-container">
            {players?.map((player, i) => (
              <FilteredBlock
                key={i}
                setData={setData as Dispatch<SetStateAction<Item>>}
                setSelectedModal={setSelectedModal}
                type={"Players"}
                item={player as Item}
              />
            ))}
            {LicensedPlayers?.map((player, i) => (
              <FilteredBlock
                key={i}
                setData={setData as Dispatch<SetStateAction<Item>>}
                type={"Players"}
                setSelectedModal={setSelectedModal}
                item={player as Item}
              />
            ))}
          </div>
        </div>
      </ItemContainer>
    </div>
  );
}

export default PlayerContent;
