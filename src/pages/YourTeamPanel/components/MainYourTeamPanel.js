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
function MainYourTeamPanel() {
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const [openModal, setOpenModal] = useState(false);
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);

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
              <button
                onClick={() => navigate(`/${language}/guide`)}
                className="btn primary-btn"
              >
                {translate.guide[language]}
              </button>
            </div>
          </div>
          <button
            className="btn primary-btn"
            onClick={() => setOpenModal(true)}
          >
            {translate.addTeam[language]}
          </button>
          <ItemContainer>
            <YourTeamContainer Team={Team} />
          </ItemContainer>
        </div>
      </div>
      {openModal && (
        <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}

export default MainYourTeamPanel;
