import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainYourTeamPanel from '../../components/main-content-elements/MainYourTeamPanel';
import "../../App.css";
function YourTeamPanel () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <Header />
        <LeftBar />
        <MainYourTeamPanel />
      </div>
    </div>
    );
}

export default YourTeamPanel;