import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import MainYourTeamPanel from './main-content-elements/MainYourTeamPanel';

import "../App.css";
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