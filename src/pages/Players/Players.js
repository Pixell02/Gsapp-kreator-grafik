import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainFooter from '../../components/MainFooter';
import PlayerMainContent from './components/Player-MainContent';
import "../../App.css";
  
function Players () {

    return (
      <div className="page-container">
        <div className='content-wrap'>
          
          <LeftBar />
          <PlayerMainContent />
          <MainFooter />
        </div>
      </div>
    );
}

export default Players;