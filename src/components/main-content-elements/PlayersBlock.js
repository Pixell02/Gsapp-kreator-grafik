import { db } from '../../firebase/config'
import { useState } from 'react'
import { doc, deleteDoc} from 'firebase/firestore'

// Styling
import * as Icon from 'react-bootstrap-icons'
import './Block.css'

import ItemContainer from './ItemContainer'
import Options from './Options'

export default function PlayersBlock({players}) {

  const [showHide, setShowHide] = useState(false);
  
    return (
        <div className='catalog-container'>  
        {players.map((player) => (
          <div className='item-window'>
            <div className='name-content'>
              <span key={player.id} className='name-content'>{player.firstPlayerName + " " + player.secondPlayerName}</span>
            <div className='option-container'>
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
              <img src={player.logo} alt={player.firstPlayerName + " " + player.secondPlayerName} />
            </div>   
          </div>
        ))}
        </div>
    )
}