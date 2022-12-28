import React, { useEffect, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import MainFooter from "../../../components/MainFooter";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import EditYourTeamWindow from "./EditYourTeamWindow";
// Styles

import "./MainYourTeamPanel.css"
import * as Icon from "react-bootstrap-icons";

function MainYourTeamPanel() {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  const [yourTeam, setYourTeam] = useState([]);
  const { id } = useParams();
  const teamLogo = async () => {
    const docRef = doc(db, "Teams", id);
    await getDoc(docRef).then((doc) => {
      setYourTeam(doc.data());
    });
  };
  useEffect(() => {
    teamLogo();
  },[setYourTeam])
  
  

  return (
    <div className="main-content">
      <div className="ml-5">
        <Title title="Panel drużyny" />
        <ItemContainer>
          <div className="catalog-container">
            <div key={yourTeam.uid} className="team-window">
              <div className="team-name-content">
                <span key={yourTeam.uid}>
                  {yourTeam.firstName + " "}
                  {yourTeam.secondName ? yourTeam.secondName : null}
                </span>
              </div>
              <div className="image-content">
                <img
                  src={yourTeam.img}
                  alt={yourTeam.firstName + " " + yourTeam.secondName}
                />
              </div>
              <div className="icon-item" onClick={(e) => setOpenEditYourTeam(true)}>
                <Icon.PencilFill style={{color: "black"}}/>
              </div>
            </div>
            {openEditYourTeam && <EditYourTeamWindow yourTeam={yourTeam} open={openEditYourTeam} onClose={(e) => setOpenEditYourTeam(false)} /> }
          </div>
        </ItemContainer>
       
      </div>
      <MainFooter />
    </div>
  );
}

export default MainYourTeamPanel;
