import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import MainCatalog from './main-content-elements/MainCatalog';
import Footer from './MainFooter';
import "../App.css";
function Catalog () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <Header />
        <LeftBar />
        <MainCatalog />
      </div>
    </div>
    );
}

export default Catalog;