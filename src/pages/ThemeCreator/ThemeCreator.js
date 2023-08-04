import React from 'react'
import LeftBar from '../../components/Left-Bar'
import ThemeWorkSpace from './ThemeWorkSpace'
import { MultiPropertiesProvider } from '../posterCreator/Context/MultiPropertiesContext'

export default function ThemeCreator() {
  
  return (
    <MultiPropertiesProvider>
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <ThemeWorkSpace />
      </div>
    </div>
    </MultiPropertiesProvider>
  )
}
