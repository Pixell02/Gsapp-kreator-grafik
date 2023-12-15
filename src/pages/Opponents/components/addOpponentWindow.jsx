import { useRef, useState } from 'react';
import Select from 'react-select';
import ImagePreview from '../../../components/ImagePreview';
import useFileReader from '../../../hooks/useFileReader';
import '../../YourTeamPanel/components/addTeamWindow.css';
import useOpponents from '../hooks/useOpponents';
import translate from '../locales/locales.json';
import { useLanguageContext } from '../../../context/LanguageContext';

function AddOpponentWindow({ open, onClose, Teams }) {
  const { language } = useLanguageContext();

  const elements = [
    { name: translate.firstOpponentName[language], className: 'firstName' },
    { name: translate.secondOpponentName[language], className: 'secondName' },
  ];
  const [image, setImage] = useState(null);
  const { preview, setPreview } = useFileReader(image);
  const { handleSubmit, opponent, teamOptions, handleTeamChange, setOpponent, handleValueChange } = useOpponents(
    Teams,
    image
  );

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={open ? 'active-modal' : 'modal'}>
      <div className="add-window">
        {elements.map((item, i) => (
          <>
            <label key={i}>{item.name}</label>
            <input
              type="text"
              onChange={e => handleValueChange(e, item.className)}
              value={opponent[item.className]}
              className={item.className}
              required
            />
          </>
        ))}
        <label>{translate.team[language]}</label>
        <Select
          options={teamOptions}
          onChange={option => handleTeamChange(option.value)}
        />
        <button
          onClick={onButtonClick}
          className="btn primary-btn add-img">
          {translate.addCrest[language]}
        </button>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept="image/png"
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        <ImagePreview
          preview={preview}
          setPreview={setPreview}
        />
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setOpponent(null);
              setImage(null);
            }}
            className="btn primary-btn">
            {translate.cancel[language]}
          </button>
          <button
            onClick={e => {
              handleSubmit(e);
              setImage(null);
              onClose(true);
            }}
            className="btn primary-btn">
            {translate.save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOpponentWindow;
