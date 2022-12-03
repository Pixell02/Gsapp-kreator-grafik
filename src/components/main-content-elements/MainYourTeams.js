import {useState} from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import Buttons from "./Buttons";
import ItemContainer from "./ItemContainer";
import Block from "./Block";
import AddTeamWindow from "./addTeamWindow";

export default function MainYourTeams () {
    const [openModal, setOpenModal] = useState(true)

    return (
        <div className="main-content">
          
          <div className="ml-5">
            <Title title = "Twoje drużyny" />
            <button className="btn primary-btn" >Dodaj drużynę</button>
            
            <ItemContainer  />
          </div>
          <MainFooter />
        </div>
    );
}

