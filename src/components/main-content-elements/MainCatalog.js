import Title from './Title';
import Footer from '../MainFooter';
import Catalog from './Block';
import './Main.css';
import { useCollection } from '../../hooks/useCollection';

function MainCatalog() {

    const {documents: posters} = useCollection('posters')
    
    return (
        <div className='main-content'>
            <div className="ml-5">
              <Title  title = "Katalog"/>
                <div className='item-container'>
                  {posters && <Catalog posters = {posters} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainCatalog;