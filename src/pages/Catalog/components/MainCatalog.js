import Title from '../../../components/main-content-elements/Title';
import Footer from '../../../components/MainFooter';
import Catalog from './CatalogBlock';
import '../../../components/main-content-elements/Main.css';
import { useCollection } from '../../../hooks/useCollection';


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
        </div>
    );
}

export default MainCatalog;