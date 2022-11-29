import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import PlayerMainContent from './main-content-elements/Player-MainContent';
import "../App.css";
  
function Players () {

    return (
      <div className="page-container">
        <div className='content-wrap'>
          <Header />
          <LeftBar />
          <PlayerMainContent />
        </div>
      </div>
    );
}

export default Players;