import { db } from '../../firebase/config'
import { useState } from 'react'
import { doc, deleteDoc} from 'firebase/firestore'

// Styling
import * as Icon from 'react-bootstrap-icons'
import './Block.css'

import ItemContainer from './ItemContainer'
import Options from './Options'

export default function YourTeamsBlock({teams}) {

    const [list, setList] = useState(false);
    const [showHide, setShowHide] = useState(false);

    const handleClick = async (id) => {
      const docRef = doc()
    }
    
    return (
        <div className='catalog-container'>  
        {teams.map((team) => (
          <div className='item-window'>
          <div className='name-content'>
              <span key={team.id} className='name-content'>{team.firstTeamName + " " + team.secondTeamName}</span>
              <div className='option-container' >
                <button onClick = {() => {
                  if(showHide == true) {
                    setShowHide(false);
                  } else {
                    setShowHide(true);
                  }
                  }
                  }>
                  <Icon.ThreeDotsVertical  style={{margin:"5px 0 0 0"}} />
                </button>
                
              <Options showHide= {showHide} />
              </div>
            </div>
            <div className='image-content'>
              <img src={team.logo} alt={team.firstTeamName + " " + team.secondTeamName} />
            </div>   
            </div>
        
        ))}
        </div>
    )
}