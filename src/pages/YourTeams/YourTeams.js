import {useState} from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainYourTeams from '../../components/main-content-elements/MainYourTeams';
import AddTeamWindow from "../../components/main-content-elements/addTeamWindow";
import "../../App.css";

function YourTeams () {
  const [openModal, setOpenModal] = useState(true)

    return (
        <div className="page-container">
          <AddTeamWindow open={setOpenModal} />
      <div className='content-wrap'>
        <Header />
        <LeftBar />
        <MainYourTeams />
      </div>
    </div>
    );
}

export default YourTeams;