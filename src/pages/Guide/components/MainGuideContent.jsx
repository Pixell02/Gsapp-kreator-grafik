import { useNavigate } from 'react-router-dom';
import Title from '../../../components/main-content-elements/Title';
import Description from './Description';
import './Description.css';
export default function MainGuideContent() {
  const navigate = useNavigate();
  return (
    <div className="main-content flex-column">
      <div className="ml-5">
        <Title title="Samouczek" />
        <Description />
      </div>
      <div className="d-flex w-100 mt-5  justify-content-center btn-guide-container">
        <button
          className="btn primary-btn mt-5 w-100"
          onClick={() => navigate('/yourTeamPanel')}>
          Wyjdź
        </button>
      </div>
    </div>
  );
}
