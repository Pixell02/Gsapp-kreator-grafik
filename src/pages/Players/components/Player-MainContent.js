import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MainFooter from "../../../components/MainFooter";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import PlayersBlock from "./PlayersBlock";
import ItemBlock from "../../../components/main-content-elements/ItemBlock";
import AddPlayerWindow from "./addPlayerWindow";
import EditPlayerWindow from "./EditPlayerWindow";
import useEditModal from "../../../hooks/useEditModal";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../App.css";
import { useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, onSnapshot, where, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useFilter } from "../../../hooks/useFilter";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";

function PlayerMainContent() {
  const { user } = useAuthContext();

  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);

  const [openModal, setOpenModal] = useState(false);
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[1];

  const handleDeleteClick = async (id) => {
    if (goodLocation === "players") {
      const ref = doc(db, "Players", id);
      await deleteDoc(ref);
    } else if (goodLocation === "opponents") {
      const ref = doc(db, "Opponents", id);
      await deleteDoc(ref);
    }
  };

  const [data, setData] = useState();
  const [itemToEdit, setItemToEdit] = useState(null);
  const hideElement = useRef(null);

  const handleClickOutside = (e) => {
    if (!hideElement.current.contains(e.target)) {
      setItemToEdit(null);
    }
  };
  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setItemToEdit]);

  const handleClick = (e, item) => {
    setItemToEdit(item);
  };
  const editClick = (e, item) => {
    setData(item);
    openEditModal();
    setItemToEdit(null);
  };
  return (
    <div className="main-content">
      <AddPlayerWindow Teams={Teams} open={openModal} onClose={() => setOpenModal(false)} />

      <div className="ml-5">
        <Title title="Zawodnicy" />
        <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
          Dodaj zawodnika
        </button>
        <ItemContainer>
          {Teams && Teams.length === 1 && (
            <>
              <div className="d-flex flew-row">
                <div ref={hideElement} className="catalog-container">
                  {Players &&
                    Players.map((player) => (
                      <>
                        
                          <FilteredBlock
                            handleDeleteClick={handleDeleteClick}
                            handleClick={handleClick}
                            editClick={editClick}
                            itemToEdit={itemToEdit}
                            setItemToEdit={setItemToEdit}
                            item={player}
                            openEditModal={openEditModal}
                            Teams={Teams}
                          />
                       
                      </>
                    ))}
                </div>
              </div>
            </>
          )}
          {Teams &&
            Teams.map((teams) => (
              <>
                <div className="ml-5 mt-3">{teams.firstName + " " + teams.secondName}</div>
                <div className="d-flex flew-row flex-wrap w-100">
                  {Players &&
                    Players.filter((player) => player.team === teams.firstName + " " + teams.secondName).map(
                      (player) => (
                        <>
                          <FilteredBlock
                            handleDeleteClick={handleDeleteClick}
                            handleClick={handleClick}
                            editClick={editClick}
                            itemToEdit={itemToEdit}
                            setItemToEdit={setItemToEdit}
                            item={player}
                            openEditModal={openEditModal}
                            Teams={Teams}
                          />
                        </>
                      )
                    )}
                </div>
              </>
            ))}
          <div className="w-100">brak drużyny</div>
          {Players &&
            Players.map((player) => (
              <>
                {player.team === undefined && (
                  <FilteredBlock
                    handleDeleteClick={handleDeleteClick}
                    handleClick={handleClick}
                    editClick={editClick}
                    itemToEdit={itemToEdit}
                    setItemToEdit={setItemToEdit}
                    item={player}
                    openEditModal={openEditModal}
                    Teams={Teams}
                  />
                )}
              </>
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
