import { useState } from 'react';
import './helpLinesModal.css';

export default function HelpLinesModal({ setHelpLinesModal, helpLinesModal, handleCreateLine }) {
  const [radioValue, setRadioValue] = useState('x');

  const handleAddLine = () => {
    handleCreateLine();
    setHelpLinesModal(!helpLinesModal);
  };

  return (
    <div className="modal-container">
      <div className="modal-block">
        <div className="title">
          <span>Dodaj linię pomocniczą</span>
        </div>
        <div className="radio-container">
          <label>
            <input
              type="radio"
              value="x"
              onChange={() => setRadioValue('x')}
              checked={radioValue === 'x'}
            />
            <span>pozioma</span>
          </label>
          <label>
            <input
              type="radio"
              value="y"
              onChange={() => setRadioValue('y')}
              checked={radioValue === 'y'}
            />
            <span>pionowa</span>
          </label>
        </div>
        <div className="btn-container">
          <button
            onClick={() => setHelpLinesModal(!helpLinesModal)}
            className="btn btn-primary">
            Anuluj
          </button>
          <button
            onClick={handleAddLine}
            className="btn btn-primary">
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
}
