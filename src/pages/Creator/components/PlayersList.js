import { useState } from "react";
import Canvas from "./Canvas";

function PlayersOption({players}) {
 
    const [player, setPlayer] = useState("");
    
     function handleChange(e)  {
      
      setPlayer(e.target.value);
      const selectedPlayer = players.filter((player) => player.img === e.target.value)[0]
      
    }
    return (
        <select name="player" id='player' value={player} onChange={handleChange} >
          <option value=""></option>
          { players.map((player) =>(
              <option key={player.id} value={player.img}>{player.firstName}  {player.secondName}</option>
            ))}
        </select>
        
        )
}


export default PlayersOption;