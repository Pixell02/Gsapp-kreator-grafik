
function OpponentsOptions({opponents}) {
    
    return (
        <select name="opponent" id='opponent'>
          { opponents.map((opponent) =>(
              <option key={opponent.id} value={opponent.logo}>{opponent.firstOpponentName}  {opponent.secondOpponentName}</option>
            ))}
        </select>
    )
}

 export default OpponentsOptions;