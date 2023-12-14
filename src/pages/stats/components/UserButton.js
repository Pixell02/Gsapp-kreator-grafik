import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../../../context/LanguageContext';

export default function UserButton(props) {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  function handleClick() {
    navigate(`/${language}/stats/${props.user}`);
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="btn primary-btn">
        Szczegóły
      </button>
    </>
  );
}
