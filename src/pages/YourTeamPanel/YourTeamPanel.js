import React, { useEffect } from 'react';
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import MainYourTeamPanel from './components/MainYourTeamPanel';
import "../../App.css";
import { useAuthContext } from '../../hooks/useAuthContext';
import { getDoc, doc, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';
import { Bookshelf } from 'react-bootstrap-icons';
function YourTeamPanel () {
   
    return (
        <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <MainYourTeamPanel />
      </div>
    </div>
    );
}

export default YourTeamPanel;