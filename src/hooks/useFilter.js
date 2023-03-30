import React, { useEffect, useState } from 'react'
import { useCollection } from './useCollection';

export const useFilter = (player, Teams) => {
  
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  
  useEffect(() => {
    if (player && Teams) {
      
      let filtered = [];
      const filter = Teams.map((team) => (
        player.filter((player) => player.team === team.firstName + " " + team.secondName)
          .map((player) => console.log(player))
      ))
      setFilteredPlayers(filtered)
      
      
    }
  },[player])


  return { filteredPlayers }
}
