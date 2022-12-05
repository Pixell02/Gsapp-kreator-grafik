import './Block.css'


export default function PlayersBlock({players}) {

    return (
        <div className='catalog-container'>  
        {players.map((player) => (
          <div className='item-window'>
            <div className='name-content'>
              <span key={player.id} className='name-content'>{player.firstPlayerName + " " + player.secondPlayerName}</span>
            </div>
            <div className='image-content'>
              <img src={player.logo} alt={player.firstPlayerName + " " + player.secondPlayerName} />
            </div>   
          </div>
        ))}
        </div>
    )
}