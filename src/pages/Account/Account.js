import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import Footer from '../../components/MainFooter';
import MainAccount from './components/MainAccount';

function Account () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <MainAccount />
        <Footer />
      </div>
    </div>
    );
}

export default Account;