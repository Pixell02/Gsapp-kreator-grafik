import {useState} from 'react';
import MainFooter from '../MainFooter';
import ItemContainer from './ItemContainer';
import Title from './Title';
import PlayersBlock from './PlayersBlock';
import AddPlayerWindow from './addPlayerWindow';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import "../../App.css";
function PlayerMainContent() {

  const { user } = useAuthContext()

  const {documents: Players} = useCollection(
    'Players',
    ['uid', '==', user.uid]
    )

  const [openModal, setOpenModal] = useState(false)
    return (
      <div className="main-content">
        <AddPlayerWindow open={openModal} onClose={() => setOpenModal(false)} />
        <div className="ml-5">
          <Title title = "Zawodnicy" />
          <button className="btn primary-btn" onClick={() => setOpenModal(true)}>Dodaj zawodnika</button>
          <ItemContainer element = {Players && <PlayersBlock players = {Players} />} />
        </div>
        <MainFooter />
      </div>
    );
}

export default PlayerMainContent;