import LeftBar from '../../components/Left-Bar';
import WorkSpace from './WorkSpace';
import { ImageRefProvider } from './context/ImageRefContext';
function Creator() {

  return (
      <ImageRefProvider>
        <div className="page-container">
          <div className='content-wrap'>
            <LeftBar />
            <WorkSpace />
          </div>
      </div>
    </ImageRefProvider>
    )
}

export default Creator;