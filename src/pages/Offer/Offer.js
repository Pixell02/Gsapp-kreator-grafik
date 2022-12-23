import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainContentOffer from './components/MainContentOffer';
import "../../App.css";
function Offer () {

    return (
      <div className="page-container">
        <div className='content-wrap'>
          <Header />
          <LeftBar />
          <MainContentOffer />
        </div>
      </div>  
    );
}

export default Offer;