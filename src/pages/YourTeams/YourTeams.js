import {useState} from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainYourTeams from './components/MainYourTeams';
// import AddTeamWindow from "./components/addTeamWindow";
import MainFooter from "../../components/MainFooter";
import "../../App.css";

function YourTeams () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <MainYourTeams />
      </div>
    </div>
    );
}

export default YourTeams;