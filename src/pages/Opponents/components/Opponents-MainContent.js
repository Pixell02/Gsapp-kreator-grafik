import {useState} from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import OpponentBlock from "./OpponentBlock";
import ItemBlock from "../../../components/main-content-elements/ItemBlock";
import AddOpponentWindow from "./addOpponentWindow";
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

function OpponentsMainContent() {
  const { user } = useAuthContext()
  const { id } = useParams()

  const {documents: Opponents} = useCollection(
    'Opponents',
    ['uid', '==', user.uid]
    )

  const [openModal, setOpenModal] = useState(false)
    return (
        <div className="main-content">
          {openModal && <AddOpponentWindow open={openModal} onClose={() => setOpenModal(false)} />}
            <div className="ml-5">
              <Title title = "Przeciwnicy" />
              <button onClick={() => setOpenModal(true)} className="btn primary-btn" >Dodaj przeciwnika</button>
              <ItemContainer  >
                {Opponents && <ItemBlock items={Opponents} />}
              </ItemContainer>
            </div>
        </div>
    );
}

export default OpponentsMainContent;