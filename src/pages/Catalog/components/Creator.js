import Header from '../../../components/Header';
import LeftBar from '../../../components/Left-Bar';
import WorkSpace from './WorkSpace';
function Creator() {

    return (
        <div className="page-container">
          <div className='content-wrap'>
            
            <LeftBar />
            <WorkSpace />
          </div>
        </div>
    )
}

export default Creator;