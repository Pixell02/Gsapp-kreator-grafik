import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainCatalog from '../../components/main-content-elements/MainCatalog';
import Footer from '../../components/MainFooter';
import "../../App.css";
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