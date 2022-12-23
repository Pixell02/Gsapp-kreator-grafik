import "./WorkSpace.css";
import PlayersOption from "./PlayersList";
import { useCollection } from "../../../hooks/useCollection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from '../../../hooks/useAuthContext';
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

import Select from "react-select";
import FabricCanvas from "./Canvas";

function WorkSpace() {
  const { id } = useParams()
  const { poster } = useParams()
  const { user } = useAuthContext()
  const [selectedOpponent, setSelectedOpponent] = useState()
  const [sponsors, setSponsors] = useState();


  const { documents: Players } = useCollection("Players", [
    "uid",
    "==",
    id
  ]);
  
  const { documents: Opponent } = useCollection("Opponents", [
    "uid",
    "==",
    id
  ]);
  const [opponent, setOpponent] = useState();
  
  const { documents: Posters } = useCollection("piecesOfPoster", [
    "uid",
    "==",
    poster
  ]);

//   useEffect(() => {
// const sponsorRef = doc(db, "Sponsors", id)
//   getDoc(sponsorRef)
//    .then((doc) => {
//     setSponsors(doc.data());
//     console.log(sponsors)
//    })


//   },[])
  
  
  
  const [selectedPlayer, setSelectedPlayer] = useState('');
  
  const handlePlayer = (e) => {
    setSelectedPlayer(e.target.value);
  }
  const setOpponentLogo = (e) => {
    setOpponent(e.target.value);
  }
  
  return (
    <div className="workspace-container">
      <div className="preview-container">
        
        {Posters  && <FabricCanvas poster = {Posters} selectedPlayer = {selectedPlayer}  opponent = {opponent} sponsors = {sponsors}  /> }
      </div>
      <div className="tools-container">
        <div className="ms-5 me-5 mt-3">
          <label>Data i miejsce</label>
          <input type="text" id="data" />
          <label>Zawodnicy</label>
          {Players && <Select  options={Players.map((player) => ({
            value: player.img,
            label: player.firstName + " " + player.secondName
          }))} onChange={setSelectedPlayer} />}
          <label>Przeciwnicy</label>
          {Opponent && <Select options={Opponent.map((opponent) => ({
            value: opponent.img,
            label: opponent.firstName + " " +opponent.secondName
          }))} onChange = {setOpponentLogo} />}
          <button className="btn primary-btn save">Zapisz</button>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
