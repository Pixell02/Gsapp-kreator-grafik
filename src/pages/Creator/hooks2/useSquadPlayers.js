import React, { useState } from 'react'

export default function useSquadPlayers(initialState) {
    const [squadPlayers, setSquadPlayers] = useState(initialState);

    const handlePlayerChange = (option, i) => {
      const newPlayerValue = [...squadPlayers];
      newPlayerValue[i] = option.value;
      setSquadPlayers(newPlayerValue);
    };
  
    return [squadPlayers, handlePlayerChange];
}
