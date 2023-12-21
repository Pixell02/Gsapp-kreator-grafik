import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../App.css";
import ReturnButton from "../../../components/ReturnButton";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useEditModal from "../../../hooks/useEditModal";
import translation from "../locales/translate.json";
import EditPlayerWindow from "./EditPlayerWindow";
import AddPlayerWindow from "./AddPlayerWindow";
import { useLanguageContext } from "../../../context/LanguageContext";
import usePlayers from "../hooks/usePlayers";
import { Player, squadPreset } from "../../../types/playerAndSquadTypes";
import { DocumentData } from "firebase/firestore";

type props = {
  [key: string]: string;
  pl: string;
  en: string;
  fr: string;
  de: string;
  es: string;
};
type translationProps = {
  addPlayer: props;
  players: props;
  firstName: props;
  lastName: props;
  number: props;
  birthYear: props;
  team: props;
  emptyField: props;
  addPhoto: props;
  noTeam: props;
  Round: props;
  cancel: props;
  save: props;
};

function PlayerContent() {
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { filteredPlayers, licensedPlayers, players } = usePlayers();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const [openModal, setOpenModal] = useState(false);
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const translate: translationProps = translation;
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[2];
  const [data, setData] = useState<DocumentData | squadPreset | undefined | null>(null);

  const hideElement = useRef(null);

  const editClick = (item: Player) => {
    const playerItem = players?.find((player) => player.id === item.id);
    setData({ ...playerItem });
    openEditModal();
  };

  return (
    <div className="main-content" ref={hideElement}>
      {openModal && <AddPlayerWindow Teams={Teams} onClose={setOpenModal} />}
      {data && isEditModal && goodLocation === "players" && (
        <EditPlayerWindow data={data} onClose={closeEditModal} Teams={Teams} />
      )}
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.players[language]} />
        <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
          {translate.addPlayer[language]}
        </button>
        <ItemContainer>
          <div className="d-flex flew-row">
            <div className="catalog-container">
              {filteredPlayers?.map((player, i) => (
                <FilteredBlock key={i} editClick={editClick} type={"Players"} item={player} />
              ))}
              {licensedPlayers?.map((player, i: number) => (
                <FilteredBlock key={i} editClick={editClick} type={"Players"} item={player} />
              ))}
            </div>
          </div>
        </ItemContainer>
      </div>
    </div>
  );
}

export default PlayerContent;
