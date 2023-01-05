import React from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainAccount from './components/MainAccount';

function Account () {

    return (
        <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <MainAccount />
      </div>
    </div>
    );
}

export default Account;