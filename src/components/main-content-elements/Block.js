import './Block.css';

export default function Block({posters}) {


    return (
        
            <div className='catalog-container'>  
            {posters.map((poster) => (
              <div className='item-window'>
              <div className='name-content'>
                  <span key={poster.key} className='name-content'>{poster.title}</span>
                </div>
                <div className='image-content'>
                  <img src={poster.img} alt={poster.img} />
                </div>   
                </div>
            
            ))}
            </div>
        
    )
}