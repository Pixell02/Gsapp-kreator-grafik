import './Block.css';

export default function Catalog({posters}) {


    return (
        
            <div className='catalog-container'>  
            {posters.map((poster) => (
              <div className='item-window'>
              <div className='name-content'>
                  <span key={poster.id} className='name-content'>{poster.title}</span>
                </div>
                <div className='image-content'>
                  <img src={poster.img} alt={poster.title} />
                </div>   
                </div>
            
            ))}
            </div>
        
    )
}