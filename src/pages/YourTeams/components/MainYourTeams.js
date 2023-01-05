import { useState } from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import YourTeamBlock from "./YourTeamsBlock";
// import AddTeamWindow from "./addTeamWindow";
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from '../../../hooks/useAuthContext';
import "../../../App.css";

export default function MainYourTeams () {
  const { user } = useAuthContext()
  const {documents: Teams} = useCollection(
    'Teams',
    ['uid', '==', user.uid]
    )

  const [openModal, setOpenModal] = useState(false)

    return (
        <div className="main-content">
          {/* <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} /> */}
          <div className="ml-5">
            <Title title = "Twoje drużyny" />
            <button onClick={() => setOpenModal(true)} className="btn primary-btn" >Dodaj drużynę</button>
            <ItemContainer >
              {Teams && <YourTeamBlock items={Teams} />}
            </ItemContainer>
          </div>
          
        </div>
    );
}

