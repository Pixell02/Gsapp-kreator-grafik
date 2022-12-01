import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import Main from '../../components/main-content-elements/MainGenerator';
import Footer from '../../components/MainFooter';
import "../../App.css";
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