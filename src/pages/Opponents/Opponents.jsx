import LeftBar from '../../components/Left-Bar';
import OpponentsMainContent from './components/Opponents-MainContent';
import '../../App.css';
import Footer from '../../components/MainFooter';

function Opponents() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <OpponentsMainContent />
        <Footer />
      </div>
    </div>
  );
}

export default Opponents;
