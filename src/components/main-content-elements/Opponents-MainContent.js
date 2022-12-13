import {useState} from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import ItemContainer from "./ItemContainer";
import OpponentBlock from "./OpponentBlock";
import AddOpponentWindow from "./addOpponentWindow";
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from "../../hooks/useAuthContext";

function OpponentsMainContent() {
  const { user } = useAuthContext()

  const {documents: Opponents} = useCollection(
    'Opponents',
    ['uid', '==', user.uid]
    )

  const [openModal, setOpenModal] = useState(false)
    return (
        <div className="main-content">
          <AddOpponentWindow open={openModal} onClose={() => setOpenModal(false)} />
            <div className="ml-5">
              <Title title = "Przeciwnicy" />
              <button onClick={() => setOpenModal(true)} className="btn primary-btn" >Dodaj drużynę</button>
              <ItemContainer element={Opponents && <OpponentBlock opponents={Opponents} />} />
            </div>
          <MainFooter />
        </div>
    );
}

export default OpponentsMainContent;