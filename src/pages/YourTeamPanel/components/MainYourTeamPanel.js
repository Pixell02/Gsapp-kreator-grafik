import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../../components/ReturnButton";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import { LanguageContext } from "../../../context/LanguageContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import "./MainYourTeamPanel.css";
import YourTeamContainer from "./YourTeamContainer";
import AddTeamWindow from "./addTeamWindow";
import translate from "./locales/yourTeamPanel.json";
import TrainersContainer from "./TrainersContainer";
import useEditModal from "../../../hooks/useEditModal";
import EditTrainerWindow from "./EditTrainerWindow";
import AddTrainerWindow from "./AddTrainerWindow";
function MainYourTeamPanel() {
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const [openModal, setOpenModal] = useState(false);
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const [trainerModal, setTrainerModal] = useState(false);
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const [data, setData] = useState(null);

  const editClick = (item) => {
    setData(item);
    openEditModal();
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="main-content">
        <div className="ml-5 w-100">
          <ReturnButton />
          <div className="d-flex align-items-center">
            <div className="w-100">
              <Title title={translate.title[language]} />
            </div>
            <div className="empty-container"></div>
            <div className="d-flex guide-btn-container">
              <button onClick={() => navigate(`/${language}/guide`)} className="btn primary-btn">
                {translate.guide[language]}
              </button>
            </div>
          </div>
          <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
            {translate.addTeam[language]}
          </button>
          <ItemContainer>
            <YourTeamContainer Team={Team} />
          </ItemContainer>
          <div className="mt-5">
            <button className="btn primary-btn" onClick={() => setTrainerModal(true)}>
              {translate.addTrainer[language]}
            </button>
            <ItemContainer>
              <TrainersContainer editClick={editClick} />
            </ItemContainer>
          </div>
        </div>
      </div>
      {trainerModal && <AddTrainerWindow Team={Team} open={trainerModal} onClose={() => setTrainerModal()} />}
      {openModal && <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} />}
      {data && isEditModal && <EditTrainerWindow Team={Team} onClose={closeEditModal} data={data} open={isEditModal} />}
    </>
  );
}

export default MainYourTeamPanel;
