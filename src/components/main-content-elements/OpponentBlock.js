import './Block.css'


export default function OpponentBlock({opponents}) {

    return (
        <div className='catalog-container'>  
        {opponents.map((opponent) => (
          <div className='item-window'>
            <div className='name-content'>
              <span key={opponent.id} className='name-content'>{opponent.firstOpponentName + " " + opponent.secondOpponentName}</span>
            </div>
            <div className='image-content'>
              <img src={opponent.logo} alt={opponent.firstOpponentName + " " + opponent.secondOpponentName} />
            </div>   
          </div>
        ))}
        </div>
    )
}