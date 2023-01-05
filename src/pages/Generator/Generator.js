
import Header from '../../components/Header';
import LeftBar from '../../components/Left-Bar';
import Main from './components/MainGenerator';

import "../../App.css";
function Generator () {

    return (
    <div className="page-container">
      <div className='content-wrap'>
        
        <LeftBar />
        <Main />
      </div>
    </div>
    );
}

export default Generator;