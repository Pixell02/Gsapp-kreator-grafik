import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import MainYourTeams from './main-content-elements/MainYourTeams';

import "../App.css";
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