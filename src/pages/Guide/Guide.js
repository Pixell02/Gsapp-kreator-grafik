import React from 'react'
import "../../App.css";
import LeftBar from '../../components/Left-Bar';
import MainGuideContent from './components/MainGuideContent';
export default function Guide() {
  return (
    <div className="page-container">
        <div className='content-wrap'>
          <LeftBar />
          <MainGuideContent />
        </div>
      </div> 
  )
}
