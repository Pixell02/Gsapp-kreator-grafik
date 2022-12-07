import { useState } from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import Buttons from "./Buttons";
import ItemContainer from "./ItemContainer";
import YourTeamsBlock from "./YourTeamsBlock";
import AddTeamWindow from "./addTeamWindow";
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import "../../App.css";

export default function MainYourTeams () {
  const { user } = useAuthContext()
  const {documents: Teams} = useCollection(
    'Teams',
    ['uid', '==', user.uid]
    )

  const [openModal, setOpenModal] = useState(false)
    return (
        <div className="main-content">
          <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} />
          <div className="ml-5">
            <Title title = "Twoje drużyny" />
            <button onClick={() => setOpenModal(true)} className="btn primary-btn" >Dodaj drużynę</button>
            
              
            <ItemContainer element={Teams && <YourTeamsBlock teams={Teams} />}  />
          </div>
          <MainFooter />
        </div>
    );
}

