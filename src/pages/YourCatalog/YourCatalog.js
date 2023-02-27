import React from 'react'
import LeftBar from '../../components/Left-Bar'
import Footer from '../../components/MainFooter'
import MainYourCatalog from './components/MainYourCatalog'
export default function YourCatalog() {
  return (
    
      <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        <MainYourCatalog />
        <Footer />
      </div>
    </div>
    
  )
}
