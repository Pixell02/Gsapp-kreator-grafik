import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import OpponentsMainContent from './components/Opponents-MainContent';
import "../../App.css";

function Opponents () {

    return (
      <div className="page-container">
        <div className='content-wrap'>
          
          <LeftBar />
          <OpponentsMainContent />        
        </div>
      </div>
    );
}

export default Opponents;