import { db } from '../../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'

import * as Icon from 'react-bootstrap-icons'
import './Block.css'

export default function Options ({showHide}) {

    return (
        <div className='option-container'>
            <ul className='show-list'>
              <Icon.ThreeDotsVertical style={{margin:"5px 0 0 0"}} />
              <div className='show-option'>
                <div className='edit-element'>
                  <li>Edytuj</li> 
                </div>
                <div className='delete-element'>
                  <li>Usuń</li>  
                </div>
                
              </div>
              </ul>
              
        </div>
    )
}