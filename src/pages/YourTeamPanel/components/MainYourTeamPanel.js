import React, { useEffect, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import MainFooter from "../../../components/MainFooter";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import EditYourTeamWindow from "./EditYourTeamWindow";
import AddTeamWindow from "./addTeamWindow";
import YourTeamBlock from "./YourTeamBlock";
// Styles

import "./MainYourTeamPanel.css";
import * as Icon from "react-bootstrap-icons";

function MainYourTeamPanel() {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  
  let checkTeam;
  if(Array.isArray(Team)) {
    if(Team.length == 0) {
      checkTeam = null;
    } else {
      checkTeam = true;
    }
  } 
  return (
    <div className="main-content">
      <div className="ml-5">
        <Title title="Panel drużyny" />
        <ItemContainer>
            {checkTeam != null  ? <YourTeamBlock Team={Team} /> : (<button className="btn primary-btn" onClick={() => setOpenModal(true)} >Dodaj logo</button>)  }
          {openModal && <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} />}
        </ItemContainer>
        
      </div>
      
    </div>
  );
}

export default MainYourTeamPanel;
