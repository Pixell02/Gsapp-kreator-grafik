import { useEffect, useRef, useState } from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import OpponentBlock from "./OpponentBlock";
import ItemBlock from "../../../components/main-content-elements/ItemBlock";
import AddOpponentWindow from "./addOpponentWindow";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLocation, useParams } from "react-router-dom";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import useEditModal from "../../../hooks/useEditModal";
import EditOpponentWindow from "./EditOpponentWindow";
import "./opponents.css";

function OpponentsMainContent() {
  const { user } = useAuthContext();
  const { id } = useParams();

  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[1];

  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
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

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="main-content">
      {openModal && <AddOpponentWindow Teams={Teams} open={openModal} onClose={() => setOpenModal(false)} />}
      <div className="ml-5">
        <Title title="Przeciwnicy" />
        <button onClick={() => setOpenModal(true)} className="btn primary-btn">
          Dodaj przeciwnika
        </button>
        <ItemContainer>
          <div ref={hideElement} className="catalog-container">
            {Teams &&
              Teams.length === 1 &&
              Teams.map((team) => (
                <>
                  <label className="w-100">{Teams[0].firstName + " " + Teams[0].secondName}</label>
                  {Opponents &&
                    Opponents.map((player) => (
                      <FilteredBlock
                        handleClick={handleClick}
                        editClick={editClick}
                        itemToEdit={itemToEdit}
                        setItemToEdit={setItemToEdit}
                        handleDeleteClick={handleDeleteClick}
                        item={player}
                        openEditModal={openEditModal}
                        Teams={Teams}
                      />
                    ))}
                </>
              ))}
          </div>
          {Teams &&
            Teams.length > 1 &&
            Teams.map((teams) => (
              <>
                <div className="ml-5 mt-3">{teams.firstName + " " + teams.secondName}</div>

                {Opponents &&
                  Opponents.filter((player) => player.team === teams.firstName + " " + teams.secondName).map(
                    (player) => (
                      <>
                        <FilteredBlock
                          handleClick={handleClick}
                          handleDeleteClick={handleDeleteClick}
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
              </>
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
