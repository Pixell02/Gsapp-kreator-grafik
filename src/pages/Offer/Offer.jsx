import React from 'react';
import LeftBar from '../../components/Left-Bar';
import MainContentOffer from './components/MainContentOffer';
import '../../App.css';
import { PromoCodeProvider } from './context/PromoCodeContext';
function Offer() {
  return (
    <PromoCodeProvider>
      <div className="page-container">
        <div className="content-wrap">
          <LeftBar />
          <MainContentOffer />
        </div>
      </div>
    </PromoCodeProvider>
  );
}

export default Offer;
