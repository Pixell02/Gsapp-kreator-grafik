import React from 'react'
import LeftBar from '../../components/Left-Bar'
import ThemeWorkSpace from './ThemeWorkSpace'

export default function ThemeCreator() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <ThemeWorkSpace />
      </div>
    </div>
  )
}
