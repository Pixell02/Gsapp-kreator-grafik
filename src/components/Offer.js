import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import MainContentOffer from './main-content-elements/MainContentOffer';
import "../App.css";

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