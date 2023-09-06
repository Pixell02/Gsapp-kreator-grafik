import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import AddPlayerWindow from "./addPlayerWindow";
import EditPlayerWindow from "./EditPlayerWindow";
import useEditModal from "../../../hooks/useEditModal";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../App.css";
import ReturnButton from "../../../components/ReturnButton";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json";
import AddSquadPlayersPresetWindow from "./AddSquadPlayersPresetWindow";
import { TeamProvider } from "../../Creator/context/teamContext";
import SlabBlock from "../../../components/SlabBlock";
import EditSquadPlayersPresetWindow from "./EditSquadPlayersPresetWindow";

function PlayerMainContent() {
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: squadPreset} = useCollection("squadPreset", ["uid", "==", user.uid])
  const [openPresetModal, setOpenPresetModal] = useState(false);
  const [openEditPresetModal, setEditPresetModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[2];

  const [data, setData] = useState();

  const hideElement = useRef(null);

  const editClick = (item) => {
    setData(item);
    openEditModal();
  };
  const editSlabClick = (item) => {
    setData(item)
    setEditPresetModal(true);
  }
  return (
    <div className="main-content" ref={hideElement}>
      <AddPlayerWindow Teams={Teams} open={openModal} onClose={setOpenModal} />

      {openPresetModal && (
        <TeamProvider>
          <AddSquadPlayersPresetWindow
            Players={Players}
            onClose={() => setOpenPresetModal(false)}
          />
        </TeamProvider>
      )}
      {openEditPresetModal && (
        <TeamProvider>
          <EditSquadPlayersPresetWindow
            data={data}
            Players={Players}
            onClose={() => setEditPresetModal(false)}
          />
        </TeamProvider>
      )}

      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.players[language]} />
        <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
          {translate.addPlayer[language]}
        </button>
        <ItemContainer>
          {Teams?.length > 0 && (
            <>
              <div className="d-flex flew-row">
                <div className="catalog-container">
                  {Players?.map((player, i) => <FilteredBlock key={i} editClick={editClick} item={player} />)}
                </div>
              </div>
            </>
          )}
        </ItemContainer>
        <button className="btn" onClick={() => setOpenPresetModal(true)}>
          Stwórz wzór
        </button>
        <label className="ml-5">(dodawanie i usuwanie aktualnie działa)</label>
        <ItemContainer>
          
          {squadPreset?.map((item, i) => (
              <SlabBlock key={i} item={item} editClick={editSlabClick} type="squadPreset" />
            ))}
          
        </ItemContainer>
      </div>
      {data && isEditModal && goodLocation === "players" && (
        <EditPlayerWindow player={data} open={isEditModal} onClose={closeEditModal} Teams={Teams} />
      )}
    </div>
  );
}

export default PlayerMainContent;
