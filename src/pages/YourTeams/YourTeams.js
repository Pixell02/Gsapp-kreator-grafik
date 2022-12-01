import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainYourTeams from '../../components/main-content-elements/MainYourTeams';
import "../../App.css";
function YourTeams () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <Header />
        <LeftBar />
        <MainYourTeams />
      </div>
    </div>
    );
}

export default YourTeams;