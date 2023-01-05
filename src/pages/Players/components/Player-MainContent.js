import { useState } from "react";
import { useParams } from "react-router-dom";
import MainFooter from "../../../components/MainFooter";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import PlayersBlock from "./PlayersBlock";
import ItemBlock from "../../../components/main-content-elements/ItemBlock";
import AddPlayerWindow from "./addPlayerWindow";
import EditPlayerWindow from "./EditPlayerWindow";
import useEditModal from "../../../hooks/useEditModal";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../App.css";
import { useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, onSnapshot, where, query, getDocs } from 'firebase/firestore'

function PlayerMainContent() {

  
  const { user } = useAuthContext();
  
  const { documents: Players } = useCollection("Players", 
  ["uid","==",user.uid]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="main-content">
      
      <AddPlayerWindow open={openModal} onClose={() => setOpenModal(false)} />
      <div className="ml-5">
        <Title title="Zawodnicy" />
        <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
          Dodaj zawodnika
        </button>
        <ItemContainer>
          {Players && < ItemBlock items={Players}   /> }
        </ItemContainer>
      </div>
      
    </div>
  );
}

export default PlayerMainContent;
