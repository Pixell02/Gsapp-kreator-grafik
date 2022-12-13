import { db } from '../../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'
import AddTeamWindow from './addTeamWindow'

import * as Icon from 'react-bootstrap-icons'
import './Block.css'

export default function Options ({showHide}) {

  const [openModal, setOpenModal] = useState(false)

    return (
         <div className={showHide ? "show-list" : "hide-list"}>
           <div  className='edit-element'>
             <button onClick={() => setOpenModal(true)}>
               Edytuj
             </button>
           </div>
           <div className='delete-element'>
            <button>
              Usuń
            </button>
           </div>
         </div>
       
    )
}