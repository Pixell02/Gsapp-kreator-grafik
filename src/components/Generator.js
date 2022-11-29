import React from 'react';
import Header from './Header';
import LeftBar from './Left-Bar';
import Main from './main-content-elements/MainGenerator';
import Footer from './MainFooter';
import "../App.css";
function Generator () {

    return (
    <div className="page-container">
      <div className='content-wrap'>
        <Header />
        <LeftBar />
        <Main />
      </div>
    </div>
    );
}

export default Generator;