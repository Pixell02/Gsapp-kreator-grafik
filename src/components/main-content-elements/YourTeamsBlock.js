import './Block.css'


export default function YourTeamsBlock({teams}) {

    return (
        <div className='catalog-container'>  
        {teams.map((team) => (
          <div className='item-window'>
          <div className='name-content'>
              <span key={team.id} className='name-content'>{team.firstTeamName + " " + team.secondTeamName}</span>
            </div>
            <div className='image-content'>
              <img src={team.logo} alt={team.firstTeamName + " " + team.secondTeamName} />
            </div>   
            </div>
        
        ))}
        </div>
    )
}