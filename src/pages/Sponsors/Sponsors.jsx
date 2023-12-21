import React from 'react';
import LeftBar from '../../components/Left-Bar';
import MainFooter from '../../components/MainFooter';
import SponsorsMainContent from './components/Sponsors-MainContent';
import '../../App.css';

function Sponsors() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <SponsorsMainContent />
        <MainFooter />
      </div>
    </div>
  );
}

export default Sponsors;
