import { db } from '../../firebase/config'
import { useState } from 'react'

// Styling
import './Block.css'

import ItemContainer from './ItemContainer'
import Options from './Options'

export default function YourTeamsBlock({teams}) {

    const [list, setList] = useState(false);

    return (
        <div className='catalog-container'>  
        {teams.map((team) => (
          <div className='item-window'>
          <div className='name-content'>
              <span key={team.id} className='name-content'>{team.firstTeamName + " " + team.secondTeamName}</span>
              <Options  />
            </div>
            <div className='image-content'>
              <img src={team.logo} alt={team.firstTeamName + " " + team.secondTeamName} />
            </div>   
            </div>
        
        ))}
        </div>
    )
}