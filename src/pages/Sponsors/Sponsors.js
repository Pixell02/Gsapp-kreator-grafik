import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import SponsorsMainContent from './components/Sponsors-MainContent';
import "../../App.css";

function Sponsors () {

    return (
        <div className="page-container">
          <div className='content-wrap'>
          <LeftBar />
          <SponsorsMainContent />
          </div>
        </div>
    );
}

export default Sponsors;