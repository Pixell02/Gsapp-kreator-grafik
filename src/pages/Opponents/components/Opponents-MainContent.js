import { useState } from "react";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import AddOpponentWindow from "./addOpponentWindow";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";

import useEditModal from "../../../hooks/useEditModal";
import EditOpponentWindow from "./EditOpponentWindow";
import ReturnButton from "../../../components/ReturnButton";
import translate from "../locales/locales.json";
import "./opponents.css";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import AddPlaceWindow from "./AddPlaceWindow";
import SlabBlock from "../../../components/SlabBlock";
import EditPlaceWindow from "./EditPlaceWindow";

function OpponentsMainContent() {
  const { user } = useAuthContext();
  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const { language } = useContext(LanguageContext);
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: PlacePresets } = useCollection("placePreset", ["uid", "==", user.uid]);

  const [data, setData] = useState();

  const editClick = (item) => {
    setData(item);
    openEditModal();
  };
  const editSlabClick = (item) => {
    setData(item);
    setIsEditOpen(true);

  }

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="main-content">
      {openModal && <AddOpponentWindow Teams={Teams} open={openModal} onClose={() => setOpenModal(false)} />}
      {openPlaceModal && <AddPlaceWindow onClose={() => setOpenPlaceModal(false)} />}
      {isEditOpen && <EditPlaceWindow onClose={() => setIsEditOpen(false)} data={data} />}
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.opponents[language]} />
        <button onClick={() => setOpenModal(true)} className="btn primary-btn">
          {translate.addOpponent[language]}
        </button>
        <ItemContainer>
          <div className="catalog-container">
            {Teams?.map((team) => (
              <>
                <label className="w-100">{team.firstName + " " + team.secondName}</label>
                {
                  Opponents?.map((player, i) => (
                    <FilteredBlock key={i} editClick={editClick} item={player} />
                  ))}
              </>
            ))}
          </div>
        </ItemContainer>
        <button className="btn" onClick={() => setOpenPlaceModal(true)}>
          Dodaj miejsce
        </button>
        <ItemContainer>
          {PlacePresets?.map((item, i) => (
            <SlabBlock key={i+"as"} item={item} type="place" editClick={editSlabClick} />
          ))}
        </ItemContainer>
      </div>
      {data && isEditModal && (
        <EditOpponentWindow player={data} open={isEditModal} onClose={closeEditModal} Teams={Teams} />
      )}
    </div>
  );
}

export default OpponentsMainContent;
