import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import SponsorsMainContent from './main-content-elements/Sponsors-MainContent';
import "../App.css";


function Sponsors () {

    return (
        <div className="page-container">
          <div className='content-wrap'>
          <Header />
          <LeftBar />
          <SponsorsMainContent />
          </div>
        </div>
    );
}

export default Sponsors;