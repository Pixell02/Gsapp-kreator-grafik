import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import OpponentsMainContent from './main-content-elements/Opponents-MainContent';

import "../App.css";

function Opponents () {

    return (
      <div className="page-container">
        <div className='content-wrap'>
          <Header />
          <LeftBar />
          <OpponentsMainContent />        
        </div>
      </div>
    );
}

export default Opponents;