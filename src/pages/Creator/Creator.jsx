import LeftBar from '../../components/Left-Bar';
import WorkSpace from './WorkSpace';
import { ImageRefProvider } from './context/ImageRefContext';
import { ThemeProvider } from './context/ThemeContext';
function Creator() {

  return (
    <ImageRefProvider>
      <ThemeProvider>
        <div className="page-container">
          <div className='content-wrap'>
            <LeftBar />
            <WorkSpace />
          </div>
      </div>
      </ThemeProvider>
    </ImageRefProvider>
    )
}

export default Creator;