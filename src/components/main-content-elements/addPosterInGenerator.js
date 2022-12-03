import {Link} from 'react-router-dom'
import './Block.css';
import plus from '../../img/plusIcon.png'
export default function AddPosterInGenerator() {
    return (
            <div className='catalog-container'> 
            <Link to= "/catalog">
              <div className='item-window'>
              <div className='name-content'>
                  <span className='name-content'>Dodaj wzór</span>
                </div>
                <div className='image-content'>
                  <img src= {plus} />
                </div>  
                </div>
              </Link>
            </div>
        
    )
}