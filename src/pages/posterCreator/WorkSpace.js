import React from 'react'
import EditPanel from './components/EditPanel'
import "./WorkSpace.css"
export default function WorkSpace() {
  return (
    <div className='add-creator-container'>
        <div className='add-preview-container'>
            
        </div>
        <div className='add-workspace-container'>
            <EditPanel />
        </div>     
    </div>
  )
}
