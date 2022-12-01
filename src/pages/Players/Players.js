import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import PlayerMainContent from '../../components/main-content-elements/Player-MainContent';
import "../../App.css";
  
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