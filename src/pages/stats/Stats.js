import React from 'react'
import LeftBar from '../../components/Left-Bar'
import "../../App.css";
import AdministratorPanel from './components/AdministratorPanel';

export default function Stats() {

  return (
    <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <AdministratorPanel />
      </div>
    </div>
  )
}
